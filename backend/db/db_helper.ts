interface updateFormat{
    sql: string,
    values: any[]
}

export function getUpdateString<T>(o:T, condition:string, table: string):updateFormat {
    const fields = Object.keys(o).filter(k => k !== condition).toString().replace(/,/g, ' = ?,');
    const sql: string =
    `UPDATE ${table} SET ${fields} = ? WHERE ${condition} = ${o[condition]}`;
    var values: any[] = [];
    Object.entries(o).forEach(([k,v]) => {
        if (k !== condition){
            values.push(v);
        }
    });

    return {
        sql:sql,
        values:values
    };
}

export function formatInsertValues<T>(o:T, table:string): string{
    if (o === null){
        return 'error';
    }

    const isObjArr = Array.isArray(o);
    if (isObjArr){
        if (o.length == 0){
            return 'error';
        }
    }
    const keys = isObjArr ? Object.keys(o[0]) : Object.keys(o);

    /** dumb hack to get past Key special keyword */
    for (const s in keys){
        if (keys[s] === 'Key'){
            keys[s] = `\`Key\``;
        }
    }
    const fields = '(' + keys.toString() + ')';

    var values:string =  isObjArr ? '' : '(';
    for(const obj in o){
        if (isObjArr){
            values += '(';
            for (const key in o[obj]){
                const t:string = typeof o[obj][key];
                if (key === keys[keys.length-1]){
                    if (t.includes('string')){
                        values += `'${o[obj][key]}'`;
                    }
                    else {
                        values += `${o[obj][key]}`;
                    }
                }
                else {
                    if (t.includes('string')){
                        values += `'${o[obj][key]}',`;
                    }
                    else {
                        values += `${o[obj][key]},`;
                    }
                }
            }
            values += '),';
        }
        else {
            const t:string = typeof o[obj];
            if (obj === keys[keys.length-1]){
                if (t.includes('string')){
                    values += `'${o[obj]}'`;
                }
                else {
                    values += `${o[obj]}`;
                }
            }
            else {
                if (t.includes('string')){
                    values += `'${o[obj]}',`;
                }
                else {
                    values += `${o[obj]},`;
                }
            }
        }
    }
    values = isObjArr ? values.substring(0,values.length-1) : values + ')';

    return `INSERT INTO ${table} ${fields} VALUES ${values}`;

}