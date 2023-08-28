export interface Team{
    TeamID: number,
    Key: string,
    City: string,
    Name: string,
    Conference: string,
    Division: string,
    PrimaryColor: string,
    SecondaryColor: string,
    TertiaryColor: string | null,
    WikipediaLogoUrl: string,
    HeadCoach: string
};

export const templateTeam: Team = {
    TeamID: 0,
    Key: '',
    City: '',
    Name: '',
    Conference: '',
    Division: '',
    PrimaryColor: '',
    SecondaryColor: '',
    TertiaryColor: '',
    WikipediaLogoUrl: '',
    HeadCoach: ''
};