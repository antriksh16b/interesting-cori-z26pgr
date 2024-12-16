import React, { useState } from 'react';

function App() {
  const [employees,setEmployees]=useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [response,setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

       <div>
        <button onClick={fetchEmployees}>Get Employees</button>
        <div>
          {employees && employees.length>0 ? (
            <ul>
              {employees.map((employee) => (
                <li key={employee.id}>
                  <strong>{employee.name}</strong> - {employee.email} - {employee.phone}
                </li>
              ))}
            </ul>
          ) : (
            <p>No employees found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
