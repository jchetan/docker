import { useState } from 'react'

const ItemForm = () => {

    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const item = {title, value};
        const response = await fetch(
            '/api/items',
            {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        const json = await response.json();
        if (!response.ok) {
            setMessage(json.error);
        } else {
            setTitle('');
            setValue('');
            setMessage('Workout Added');
        }
    }

    return (
        <div className="row justify-content-center my-2">
            <div className="col-4 border">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="itemTitle" className="form-label">Item Title</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="itemTitle"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="itemValue" className="form-label">Item Value</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="itemValue" 
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                        />
                    </div>                    
                    <button type="submit" className="btn btn-primary mb-3">Add Item</button>
                    {message && 
                        <div>
                            {message}
                        </div>
                    }
                </form>
            </div>
        </div>

    )
}

export default ItemForm;