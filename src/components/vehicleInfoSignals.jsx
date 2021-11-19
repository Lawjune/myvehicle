import React, { Component } from "react";
import _ from "loadsh";
import { Link } from "react-router-dom";

import { getVehicleInfoSignals } from "../services/fakeVisService";
import { getTypes } from "../services/fakeTypeService";

import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import SignalsTable from "./signalsTable";
import SearchBox from "./common/searchBox";

class VehicleInfoSignals extends Component {
  state = {
    signals: [],
    types: [],
    currentPage: 1,
    pageSize: 10,
    sortColumn: { path: "signal", order: "asc" },
    searchQuery: "",
    selectedType: null,
  };

  componentDidMount() {
    const types = [{ _id: "", name: "All Types" }, ...getTypes()];
    this.setState({ signals: getVehicleInfoSignals(), types });
  }

  handleActivate = (signal) => {
    const signals = [...this.state.signals];
    const index = signals.indexOf(signal);
    signals[index] = { ...signals[index] };
    signals[index].activated = !signals[index].activated;

    this.setState({ signals });
  };

  handleLike = (signal) => {
    const signals = [...this.state.signals];
    const index = signals.indexOf(signal);
    signals[index] = { ...signals[index] };
    signals[index].liked = !signals[index].liked;
    this.setState({ signals });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleTypeSelect = (type) => {
    this.setState({ selectedType: type, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedType: null, currentPage: 1 });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      selectedType,
      sortColumn,
      signals: allSignals,
      searchQuery,
    } = this.state;

    let filtered = allSignals;
    if (searchQuery)
      filtered = allSignals.filter((s) =>
        s.signal.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedType && selectedType._id)
      filtered = allSignals.filter((s) => s.type === selectedType.name);

    const sorted = _.orderBy(filtered, [sortColumn.path], sortColumn.order);

    const signals = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: signals };
  };

  render() {
    const { length: count } = this.state.signals;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no signals in the database.</p>;

    const { totalCount, data } = this.getPageData();

    return (
      <div className="row">
        <div className="col">
          {/* <Link
            to={{
              pathname: "/signal/new",
            }}
          >
            <button className="btn btn-primary">New Signal</button>
          </Link> */}
          <p style={{ marginTop: "20px" }}>
            Showing {totalCount} Vehicle Information Signals in the database.
          </p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <SignalsTable
            signals={data}
            sortColumn={sortColumn}
            onActivate={this.handleActivate}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
        <div className="col-3">
          <ListGroup
            items={this.state.types}
            selectedItem={this.state.selectedType}
            onItemSelect={this.handleTypeSelect}
          />
        </div>
        {/* <div className="col-4">
          <ListGroup
            items={this.state.types}
            selectedItem={this.state.selectedType}
            onItemSelect={this.handleTypeSelect}
          />
        </div> */}
      </div>
    );
  }
}

export default VehicleInfoSignals;
