interface Activity {
    name: string
    id: string
    verified: boolean
    public: boolean
}

type RAIN = 'NOT_ALLOWED' | 'ENCOURAGED' | 'ALLOWED' | 'AFTER'