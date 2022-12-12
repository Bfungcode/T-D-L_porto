import React, { useState } from 'react'
import '../styling/home.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getTodos } from '../features/todoSlice'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function modalOpen(props) {
    return (
        <Modal
            {...props}
            size="lg"
            centered
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.title id="contained-modal-title-vcenter">
                    Modal Heading
                </Modal.title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
const Home = () => {
    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(10);
    const [currentPage, setCurrentPage] = useState();
    const [modalShow, setModalShow] = useState(false);
    const user = localStorage.getItem('user')
    const allPage = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const getList = () => {
        dispatch(getTodos(page))
            .unwrap()
            .then((data) => {
                setList(data)
            })
    }
    useEffect(() => {
        getList();
    }, [page]);
    return (
        <div className='main'>
            <div className='container'>
                <div className='navBar'>
                    <div className='navWrapper'>
                        <div className='profile'>
                            <h1>HELLO! {user}</h1>
                        </div>
                        <div className='logOut'>
                            <Link to='/'>
                                <button className='btn primary btn-light' id='buttonLogOut'>LogOut</button>
                            </Link>
                        </div>
                        <hr></hr>
                    </div>
                </div>
            </div>
            <div className='container d-flex justify-content-center align-items-center mt-3'>
                <h1>YOUR TO DO LISTS</h1>
            </div>
            <hr className='hrMid'></hr>
            {list ? (
                <div className='container'>
                    <div className='navigationW'>
                        <div className='createTodo'>
                            <svg width="30" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6Z" fill="black" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 22C3.34315 22 2 20.6569 2 19V5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5ZM4 19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5V19Z" fill="black" />
                            </svg>

                        </div>
                        <div className='pagination'>
                            <div className='previouPrev'>
                                <button className='btn btn-light' disabled={page <= 1} onClick={() => { setPage(page - 1) }}>Prev</button>
                            </div>
                            <div className='currentP'>
                                <button className='btn btn-light'>{page}</button>
                            </div>
                            <div className='nextPrev'>
                                <button className='btn btn-light' disabled={page >= allPage.length} onClick={() => { setPage(page + 1) }}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
            <div className='container'>
                <div className='boxWrapper'>
                    {list.map((each) => {
                        return (
                            <>
                                <div className='list'>
                                    <div className='upper'>
                                        <div className='id'>
                                            <h3>{each.id}</h3>
                                        </div>
                                        <div className='head'>
                                            <h5>{each.title}</h5>
                                        </div>
                                    </div>
                                    <div className='lineB'>
                                        <hr></hr>
                                    </div>
                                    <div className='status'>
                                        <h3>{each.completed ? 'DONE' : 'NOT DONE'}</h3>
                                        <input type="checkbox" className="inputCB" checked={each.completed}></input>
                                        <div className='deleteChange'>
                                            <div className='change'>
                                                <svg width="28" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_1_1580)">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.63526 3.28563L12.7172 6.37214L3.96469 15.144C3.84913 15.2598 3.6924 15.3249 3.52898 15.325L0.842487 15.5C0.672332 15.5001 0.499993 15.3275 0.5 15.157L0.702237 12.4941C0.702244 12.3304 0.76717 12.1733 0.882732 12.0575L9.63526 3.28563ZM9.71564 5.26284L10.7436 6.29226L3.18265 13.87L1.9836 14.0412L2.15466 12.8406L9.71564 5.26284Z" fill="#4D5061" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6644 2.25695L12.2053 0.713154C12.489 0.428949 12.9489 0.428949 13.2326 0.713154L15.2872 2.77155C15.5709 3.05575 15.5709 3.51654 15.2872 3.80075L13.7463 5.34454L10.6644 2.25695Z" fill="#4D5061" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1_1580">
                                                            <rect width="16" height="16" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                            </div>
                                            <div className='delete'>
                                                <svg width="32" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M17.7427 8.46448L19.1569 9.87869L17.0356 12L19.157 14.1214L17.7428 15.5356L15.6214 13.4142L13.5 15.5355L12.0858 14.1213L14.2072 12L12.0859 9.87878L13.5002 8.46457L15.6214 10.5858L17.7427 8.46448Z" fill="black" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.58579 19L2.29289 12.7071C1.90237 12.3166 1.90237 11.6834 2.29289 11.2929L8.58579 5H22.5857V19H8.58579ZM9.41421 7L4.41421 12L9.41421 17H20.5857V7H9.41421Z" fill="black" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <modalOpen
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home