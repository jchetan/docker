import { useState } from 'react'

const ItemForm = () => {

    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const item = {key, value};
        const response = await fetch(
            '/api/additem',
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
            setKey('');
            setValue('');
            setMessage('Item Added');
        }
    }

    return (
        <div className="row justify-content-center my-2">
            <div className="col-4 border">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="itemKey" className="form-label">Item Key</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="itemKey"
                            onChange={(e) => setKey(e.target.value)}
                            value={key}
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