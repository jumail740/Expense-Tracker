import { useEffect, useState } from 'react'
import API from '../services/api'
import Navbar from '../components/Navbar'

import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts'

function Dashboard() {

    const [balance, setBalance] = useState({})
    const [categories, setCategories] = useState([])

    useEffect(() => {

        fetchBalance()
        fetchCategories()

    }, [])

    const fetchBalance = async () => {

        try {

            const response = await API.get(
                'transactions/balance/'
            )

            setBalance(response.data)

        } catch (error) {

            console.log(error)
        }
    }

    const fetchCategories = async () => {

        try {

            const response = await API.get(
                'transactions/category_breakdown/'
            )

            setCategories(response.data)

        } catch (error) {

            console.log(error)
        }
    }

    return (

    <div
        style={{
            padding: '30px',
            backgroundColor: '#f5f5f5',
            minHeight: '100vh'
        }}
    >

        <Navbar />

        <h1
            style={{
                marginBottom: '30px'
            }}
        >
            Dashboard
        </h1>

        <div
            style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '30px'
            }}
        >

            <div
                style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    width: '200px',
                    boxShadow: '0px 0px 5px gray'
                }}
            >

                <h3>Income</h3>

                <h2>
                    ₹ {balance.total_income}
                </h2>

            </div>

            <div
                style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    width: '200px',
                    boxShadow: '0px 0px 5px gray'
                }}
            >

                <h3>Expense</h3>

                <h2>
                    ₹ {balance.total_expense}
                </h2>

            </div>

            <div
                style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    width: '200px',
                    boxShadow: '0px 0px 5px gray'
                }}
            >

                <h3>Balance</h3>

                <h2>
                    ₹ {balance.balance}
                </h2>

            </div>

        </div>

        <a
            href="/transactions"
            style={{
                textDecoration: 'none',
                backgroundColor: 'black',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '5px'
            }}
        >
            Add Transaction
        </a>

        <div
            style={{
                display: 'flex',
                gap: '30px',
                marginTop: '40px'
            }}
        >

            <div
                style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 5px gray'
                }}
            >

                <h2>Pie Chart</h2>

                <PieChart width={400} height={300}>

                    <Pie
                        data={categories}
                        dataKey="total"
                        nameKey="category"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >

                        {
                            categories.map((entry, index) => (
                                <Cell key={index} />
                            ))
                        }

                    </Pie>

                    <Tooltip />

                </PieChart>

            </div>

            <div
                style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 5px gray'
                }}
            >

                <h2>Bar Chart</h2>

                <BarChart
                    width={500}
                    height={300}
                    data={categories}
                >

                    <XAxis dataKey="category" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="total"
                        fill="#82ca9d"
                    />

                </BarChart>

            </div>

        </div>

    </div>
)
}

export default Dashboard