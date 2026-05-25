function Navbar() {

    const logout = () => {

        localStorage.clear()

        window.location.href = '/'
    }

    return (

        <div
            style={{
                backgroundColor: 'black',
                padding: '15px 30px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: '10px',
                marginBottom: '30px'
            }}
        >

            <div>

                <a
                    href="/dashboard"
                    style={{
                        color: 'white',
                        textDecoration: 'none',
                        marginRight: '20px',
                        fontSize: '18px'
                    }}
                >
                    Dashboard
                </a>

                <a
                    href="/transactions"
                    style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '18px'
                    }}
                >
                    Transactions
                </a>

            </div>

            <button
                onClick={logout}
                style={{
                    backgroundColor: 'white',
                    color: 'black',
                    border: 'none',
                    padding: '8px 15px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Logout
            </button>

        </div>
    )
}

export default Navbar