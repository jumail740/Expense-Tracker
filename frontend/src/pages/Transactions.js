import { useEffect, useState } from 'react'
import API from '../services/api'
import Navbar from '../components/Navbar'

function Transactions() {
    
    const [editId, setEditId] = useState(null)
    const [transactions, setTransactions] = useState([])
    const [types, setTypes] = useState([])
    const [categories, setCategories] = useState([])

    const [amount, setAmount] = useState('')
    const [type, setType] = useState('')
    const [category, setCategory] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {

    fetchTransactions()
    fetchChoices()

}, [])

    const fetchTransactions = async () => {

        try {

            const response = await API.get(
                'transactions/'
            )

            setTransactions(response.data)

        } catch (error) {

            console.log(error.response.data)
        }
    }

    const addTransaction = async () => {

        try {

            await API.post(
                'transactions/',
                {
                    amount,
                    type,
                    category,
                    date,
                    description
                }
            )

            alert('Transaction Added')

            fetchTransactions()

        } catch (error) {

            console.log(error.response.data)
        }
    }
    const updateTransaction = async () => {

    try {

        await API.put(
            `transactions/${editId}/`,
            {
                amount,
                type,
                category,
                date,
                description
            }
        )

        alert('Updated')

        setEditId(null)

        fetchTransactions()

    } catch (error) {

        console.log(error)
    }
}

    const deleteTransaction = async (id) => {

        try {

            await API.delete(
                `transactions/${id}/`
            )

            alert('Deleted')

            fetchTransactions()

        } catch (error) {

            console.log(error)
        }
    }
    const fetchChoices = async () => {

    try {

        const response = await API.get(
            'choices/'
        )

        setTypes(response.data.types)

        setCategories(response.data.categories)

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
            Transactions
        </h1>

        <div
            style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0px 0px 5px gray',
                marginBottom: '30px',
                width: '400px'
            }}
        >

            <h2>
                {editId ? 'Edit Transaction' : 'Add Transaction'}
            </h2>

            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '10px'
                }}
            />

            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '10px'
                }}
            >

                <option value="">
                    Select Type
                </option>

                {
                    types.map((item, index) => (

                        <option
                            key={index}
                            value={item[0]}
                        >
                            {item[1]}
                        </option>
                    ))
                }

            </select>

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '10px'
                }}
            >

                <option value="">
                    Select Category
                </option>

                {
                    categories.map((item, index) => (

                        <option
                            key={index}
                            value={item[0]}
                        >
                            {item[1]}
                        </option>
                    ))
                }

            </select>

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '10px'
                }}
            />

            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '10px'
                }}
            />

            {
                editId ? (

                    <button
                        onClick={updateTransaction}
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: 'black',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Update Transaction
                    </button>

                ) : (

                    <button
                        onClick={addTransaction}
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: 'black',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Add Transaction
                    </button>

                )
            }

        </div>

        <h2>All Transactions</h2>

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
                            borderRadius: '10px',
                            boxShadow: '0px 0px 5px gray'
                        }}
                    >

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

                        <button
                            onClick={() => deleteTransaction(item.id)}
                            style={{
                                backgroundColor: 'red',
                                color: 'white',
                                border: 'none',
                                padding: '8px 12px',
                                marginRight: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            Delete
                        </button>

                        <button
                            onClick={() => {

                                setEditId(item.id)

                                setAmount(item.amount)
                                setType(item.type)
                                setCategory(item.category)
                                setDate(item.date)
                                setDescription(item.description)
                            }}
                            style={{
                                backgroundColor: 'black',
                                color: 'white',
                                border: 'none',
                                padding: '8px 12px',
                                cursor: 'pointer'
                            }}
                        >
                            Edit
                        </button>

                    </div>
                ))
            }

        </div>

    </div>
)
}

export default Transactions