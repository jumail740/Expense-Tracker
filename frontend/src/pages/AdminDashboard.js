import { useEffect, useState } from 'react'
import API from '../services/api'
import Navbar from '../components/Navbar'

function AdminDashboard() {

    const [users, setUsers] = useState([])
    const [transactions, setTransactions] = useState([])
    const [category, setCategory] = useState('')

    useEffect(() => {

        fetchUsers()
        fetchTransactions()

    }, [])

    const fetchUsers = async () => {

        try {

            const response = await API.get(
                'admin/users/'
            )

            setUsers(response.data)

        } catch (error) {

            console.log(error)
        }
    }

    const fetchTransactions = async () => {

        try {

            const response = await API.get(
                'admin/transactions/'
            )

            setTransactions(response.data)

        } catch (error) {

            console.log(error)
        }
    }
    const filterTransactions = async () => {

    try {

        const response = await API.get(
            `admin/filter/?category=${category}`
        )

        setTransactions(response.data)

    } catch (error) {

        console.log(error)
    }
}

    return (

    <div
        style={{
            backgroundColor: '#f5f5f5',
            minHeight: '100vh',
            padding: '30px'
        }}
    >

        <Navbar />

        <h1
            style={{
                marginBottom: '30px'
            }}
        >
            Admin Dashboard
        </h1>

        <div
            style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0px 0px 5px gray',
                marginBottom: '30px'
            }}
        >

            <h2>Filter Transactions</h2>

            <input
                type="text"
                placeholder="Enter Category"
                onChange={(e) => setCategory(e.target.value)}
                style={{
                    padding: '10px',
                    width: '250px',
                    marginRight: '10px'
                }}
            />

            <button
                onClick={filterTransactions}
                style={{
                    padding: '10px 20px',
                    backgroundColor: 'black',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                Filter
            </button>

        </div>

        <h2
            style={{
                marginBottom: '20px'
            }}
        >
            All Users
        </h2>

        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))',
                gap: '20px',
                marginBottom: '40px'
            }}
        >

            {
                users.map((user) => (

                    <div
                        key={user.id}
                        style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '10px',
                            boxShadow: '0px 0px 5px gray'
                        }}
                    >

                        <h3>
                            {user.username}
                        </h3>

                        <p>
                            {user.email}
                        </p>

                        <p>
                            Role: {user.role}
                        </p>

                    </div>
                ))
            }

        </div>

        <h2
            style={{
                marginBottom: '20px'
            }}
        >
            All Transactions
        </h2>

        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
                gap: '20px'
            }}
        >

            {
                transactions.map((item) => (

                    <div
                        key={item.id}
                        style={{
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
    borderLeft:
        item.type === 'income'
        ? '6px solid green'
        : '6px solid red'
}}
                    >
                        <p
    style={{
        fontWeight: 'bold',
        color: '#555',
        marginBottom: '10px'
    }}
>
    User: {item.username}
</p>

                        <h3>
                            {item.category}
                        </h3>

                        <p>
                            Amount: ₹ {item.amount}
                        </p>

                        <p>
                            Type: {item.type}
                        </p>

                        <p>
                            Date: {item.date}
                        </p>

                        <p>
                            {item.description}
                        </p>

                    </div>
                ))
            }

        </div>

    </div>
)
}

export default AdminDashboard