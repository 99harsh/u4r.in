import { Table, Form } from 'react-bootstrap'
import "../Dashboard/Styles.scss";
import "./Styles.scss";
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import axios from 'axios';
import settings from '../../constants/settings';

import LoaderAnimation from "../../assets/icons/loader.svg";

const Details = () => {

    const [urlHistory, setUrlHistory]: any = useState({});
    const [isLoading, setIsLoading]: any = useState(true);
    useEffect(() => {
        setIsLoading(true);
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('id');
        getUrlDetails(myParam);
    }, [])

    const getUrlDetails = async (id: any) => {
        try {
            const headers = {
                access_token: localStorage.getItem("auth_token")
            }
            const { data }: any = await axios.get(`${settings.appURL}user/url/${id}`, { headers: headers })
            if (data.status !== 200) {
                return alert("Something went wrong!");
            }
            setUrlHistory(data.data)
        } catch (error) {
            alert("error");
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            {
                isLoading ?
                    <>
                        <div className="loading-animation">
                            <img src={LoaderAnimation} />
                        </div>
                    </> :
                    <div className='dashboard-main-container'>
                        <div className='create-container'>
                            <div className='table-custom'>
                                <div className='mb-2'>
                                    <span>Title: {urlHistory?.title}</span>
                                </div>
                                <div className='mb-2'>
                                    <span>Shorten URL: <a href={urlHistory?.shorten_url} target='blank'>{urlHistory?.shorten_url}</a></span>
                                </div>
                                <div className='mb-2'>
                                    <span>Destination URL: <a href={urlHistory?.destination_url}  target='blank'>{urlHistory?.destination_url}</a></span>
                                </div>
                                <div className='mb-2'>
                                    <span>Created at: {format(urlHistory.created_at, "dd-MMM  hh:mm:ss aa")}</span>
                                </div>
                            </div>
                            
                            <div className='mb-2'>
                        
                               </div> 

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Pincode</th>
                                        <th>City</th>
                                        <th>State</th>
                                        <th>Country</th>
                                        <th>Clicked On</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        urlHistory?.history?.map((element: any, index: any) => {
                                            return (
                                                <tr>
                                                    <td>{element.pincode}</td>
                                                    <td>{element.city}</td>
                                                    <td>{element.state}</td>
                                                    <td>{element.country}</td>
                                                    <td>{format(element.click_ts, "dd-MMM  hh:mm:ss aa")}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr>

                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
            }
        </div>
    )

}

export default Details;