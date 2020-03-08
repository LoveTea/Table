import React from "react";
import Arrow from "./Arrow/Arrow";
import './Table.css';

export default (props) => (
    <table className="table">
        <thead>
            <tr>
                <th onClick={props.onSort.bind(null, 'id')}>
                    ID {props.sortField === 'id' ? <Arrow sortType={props.sort} /> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'firstName')}>
                    First Name {props.sortField === 'firstName' ? <Arrow sortType={props.sort} /> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'lastName')}>
                    Last Name {props.sortField === 'lastName' ? <Arrow sortType={props.sort} /> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'email')}>
                    Email {props.sortField === 'email' ? <Arrow sortType={props.sort} /> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'phone')}>
                    Phone {props.sortField === 'phone' ? <Arrow sortType={props.sort} /> : null}
                </th>
            </tr>
        </thead>
        <tbody>
            {props.data.map(item => (
                <tr key={item.id + item.phone} onClick={props.onRowSelect.bind(null, item)}>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                </tr>
            ))}
        </tbody>
    </table>
);