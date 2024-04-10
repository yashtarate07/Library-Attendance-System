import React, { useState } from 'react';
import './Demo.css'; // Assuming you have a CSS file for styling

const Demo = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [searchFormVisible, setSearchFormVisible] = useState(false);
    const [darkMode, setDarkMode] = useState(false); // State for dark mode toggle

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const toggleSearchForm = () => {
        setSearchFormVisible(!searchFormVisible);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // Sample event handler for logout button
    const handleLogout = () => {
        // Perform logout actions here
        console.log('Logged out');
    };

    // Sample event handler for todo item completion
    const handleTodoComplete = (todoId) => {
        // Mark todo item as completed
        console.log(`Todo item ${todoId} completed`);
    };






    return (
        <div classNameName={`admin-dashboard ${sidebarVisible ? '' : 'hide'} ${darkMode ? 'dark-mode' : ''}`}>
            <section id="sidebar">
                <a href="#" className="brand">
			<i className='bx bxs-smile'></i>
			<span className="text">AdminHub</span>
		</a>
		<ul className="side-menu top">
			<li className="active">
				<a href="#">
					<i className='bx bxs-dashboard' ></i>
					<span className="text">Dashboard</span>
				</a>
			</li>
			<li>
				<a href="#">
					<i className='bx bxs-shopping-bag-alt' ></i>
					<span className="text">My Store</span>
				</a>
			</li>
			<li>
				<a href="#">
					<i className='bx bxs-doughnut-chart' ></i>
					<span className="text">Analytics</span>
				</a>
			</li>
			<li>
				<a href="#">
					<i className='bx bxs-message-dots' ></i>
					<span className="text">Message</span>
				</a>
			</li>
			<li>
				<a href="#">
					<i className='bx bxs-group' ></i>
					<span className="text">Team</span>
				</a>
			</li>
		</ul>
		<ul className="side-menu">
			<li>
				<a href="#">
					<i className='bx bxs-cog' ></i>
					<span className="text">Settings</span>
				</a>
			</li>
			<li>
				<a href="#" className="logout">
					<i className='bx bxs-log-out-circle' ></i>
					<span className="text">Logout</span>
				</a>
			</li>
		</ul>
            </section>

          
            <section id="content">
                {/* Navbar */}
                <nav>
			<i className='bx bx-menu' ></i>
			<a href="#" className="nav-link">Categories</a>
			<form action="#">
				<div className="form-input">
					<input type="search" placeholder="Search..."/>
					<button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
				</div>
			</form>
			<input type="checkbox" id="switch-mode" hidden/>
			<label for="switch-mode" className="switch-mode"></label>
			<a href="#" className="notification">
				<i className='bx bxs-bell' ></i>
				<span className="num">8</span>
			</a>
			<a href="#" className="profile">
				<img src="img/people.png"/>
			</a>
		</nav>
                {/* Main */}
                <main>
			<div className="head-title">
				<div className="left">
					<h1>Dashboard</h1>
					<ul className="breadcrumb">
						<li>
							<a href="#">Dashboard</a>
						</li>
						<li><i className='bx bx-chevron-right' ></i></li>
						<li>
							<a className="active" href="#">Home</a>
						</li>
					</ul>
				</div>
				<a href="#" className="btn-download">
					<i className='bx bxs-cloud-download' ></i>
					<span className="text">Download PDF</span>
				</a>
			</div>

			<ul className="box-info">
				<li>
					<i className='bx bxs-calendar-check' ></i>
					<span className="text">
						<h3>1020</h3>
						<p>New Order</p>
					</span>
				</li>
				<li>
					<i className='bx bxs-group' ></i>
					<span className="text">
						<h3>2834</h3>
						<p>Visitors</p>
					</span>
				</li>
				<li>
					<i className='bx bxs-dollar-circle' ></i>
					<span className="text">
						<h3>$2543</h3>
						<p>Total Sales</p>
					</span>
				</li>
			</ul>


			<div className="table-data">
				<div className="order">
					<div className="head">
						<h3>Recent Orders</h3>
						<i className='bx bx-search' ></i>
						<i className='bx bx-filter' ></i>
					</div>
					<table>
						<thead>
							<tr>
								<th>User</th>
								<th>Date Order</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									{/* <img src="img/people.png"/> */}
									<p>John Doe</p>
								</td>
								<td>01-10-2021</td>
								<td><span className="status completed">Completed</span></td>
							</tr>
							<tr>
								<td>
									{/* <img src="img/people.png"/> */}
									<p>John Doe</p>
								</td>
								<td>01-10-2021</td>
								<td><span className="status pending">Pending</span></td>
							</tr>
							<tr>
								<td>
									{/* <img src="img/people.png"/> */}
									<p>John Doe</p>
								</td>
								<td>01-10-2021</td>
								<td><span className="status process">Process</span></td>
							</tr>
							<tr>
								<td>
									{/* <img src="img/people.png"/> */}
								</td>
								<td>01-10-2021</td>
								<td><span className="status pending">Pending</span></td>
							</tr>
							<tr>
								<td>
									{/* <img src="img/people.png"/> */}
									<p>John Doe</p>
								</td>
								<td>01-10-2021</td>
								<td><span className="status completed">Completed</span></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="todo">
					<div className="head">
						<h3>Todos</h3>
						<i className='bx bx-plus' ></i>
						<i className='bx bx-filter' ></i>
					</div>
					<ul className="todo-list">
						<li className="completed">
							<p>Todo List</p>
							<i className='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li className="completed">
							<p>Todo List</p>
							<i className='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li className="not-completed">
							<p>Todo List</p>
							<i className='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li className="completed">
							<p>Todo List</p>
							<i className='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li className="not-completed">
							<p>Todo List</p>
							<i className='bx bx-dots-vertical-rounded' ></i>
						</li>
					</ul>
				</div>
			</div>
		</main>
                {/* Add your HTML content here */}

                {/* Sample button for dark mode toggle */}
                <button onClick={toggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>

                {/* Sample logout button */}
                <button onClick={handleLogout}>Logout</button>

                {/* Sample todo list */}
                <ul>
                    <li>
                        <span>Todo item 1</span>
                        <button onClick={() => handleTodoComplete(1)}>Complete</button>
                    </li>
                    <li>
                        <span>Todo item 2</span>
                        <button onClick={() => handleTodoComplete(2)}>Complete</button>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default Demo;
