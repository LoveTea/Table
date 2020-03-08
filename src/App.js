import React from 'react';
import ReactPaginate from 'react-paginate';
import Loader from "./components/Loader/Loader";
import Table from "./components/Table/Table";
import orderBy from 'lodash.orderby';
import chunk from 'lodash.chunk';
import DetailRowView from "./components/DetailRowView/DetailRowView";
import ModeSelector from "./components/ModeSelector/ModeSelector";
import TableSearch from "./components/TableSearch/TableSearch";

class App extends React.Component {
    state = {
        isModeSelected: false,
        people: [],
        isLoading: false,
        sort: 'asc',
        search: '',
        sortField: 'id',
        row: null,
        currentPage: 0
    };

    fetchData(url) {
        this.setState({
            isLoading: true
        });
        fetch(url)
            .then(data => data.json())
            .then(people => (
                this.setState({
                    people: orderBy(people, this.state.sortField, this.state.sort),
                    isLoading: false
                })
            ))
    }

    onSort = sortField => {
        const cloned = this.state.people.concat();
        const sort = this.state.sort === 'asc' ? 'desc' : 'asc';
        const people = orderBy(cloned, sortField, sort);

        this.setState({
            people,
            sort,
            sortField
        })
    };

    onRowSelect = row => {
        this.setState({
            row
        })
    };

    modeSelectHandler = url => {
        this.setState({
            isModeSelected: true,
            isLoading: true
        });

        this.fetchData(url);
    };

    pageChangeHandler = ({selected}) => {
        this.setState({
            currentPage: selected
        })
    };

    searchHandler = search => {
        this.setState({
            search,
            currentPage: 0
        })
    };

    getFilteredData() {
        const {people, search} = this.state;

        if (!search) {
            return people
        }

        return people.filter(item => {
           return item['firstName'].toLowerCase().includes(search.toLowerCase())
        });
    }

    render() {
        const pageSize = 50;

        if (!this.state.isModeSelected) {
            return (
                <div className="container">
                    <ModeSelector onSelect={this.modeSelectHandler} />
                </div>
            )
        }

        const filteredData = this.getFilteredData();
        const pageCount = Math.ceil(filteredData.length / pageSize);
        const displayData = chunk(filteredData, pageSize)[this.state.currentPage];

        return (
            <div className="container">
                {
                    this.state.isLoading
                        ? <Loader/>
                        : <>
                            <TableSearch onSearch={this.searchHandler}/>
                            <Table
                                data={displayData}
                                onSort={this.onSort}
                                sort={this.state.sort}
                                sortField={this.state.sortField}
                                onRowSelect={this.onRowSelect}
                            />
                          </>
                }

                {
                    this.state.people.length > pageSize
                    ?    <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.pageChangeHandler}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            nextClassName="page-item"
                            previousLinkClassName="page-link"
                            nextLinkClassName="page-link"
                            forcePage={this.state.currentPage}
                        />
                        : null
                }

                {
                    this.state.row
                    ? <DetailRowView
                        person={this.state.row}
                        />
                    : null
                }
            </div>
        )
    }

}

export default App;
