interface Activity {
    name: string
    id: number
    verified: boolean
    public: boolean
}

type RAIN = 'NOT_ALLOWED' | 'ENCOURAGED' | 'ALLOWED' | 'AFTER'