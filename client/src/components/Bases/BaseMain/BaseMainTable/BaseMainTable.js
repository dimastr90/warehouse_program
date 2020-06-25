import React from "react";



class BaseMainTable extends React.Component {
    state = {
        currentBase: this.props.currentBase,
        edit: false,
        id: this.props.data.uniq_Id,
        category: this.props.data.category,
        name: this.props.data.name,
        price: this.props.data.price,
        qty: this.props.data.qty,
        oldState: {}
    };

    //deleting item;
    deleteItemHandler = e => {
        this.props.removeBaseItemHandler(this.state.id);
    };

    //turns on edit mode;
    editHandler = () => {
        this.setState(prevState => ({
            edit: true,
            oldState: { price: prevState.price, qty: prevState.qty }
        }));
    };

    //when your press ok in edit mode;
    editOkHandler = () => {
        const { price: oldPrice, qty: oldQty } = this.state.oldState;
        const { qty, price } = this.state;
        if (oldPrice !== price || oldQty !== qty) {
            this.replaceItemValues();
        }
        this.setState({ edit: false });
    };

    //sub function for editOkHandler. Replace item qty and price;
    replaceItemValues = () => {
        const {id, price, qty} = this.state;
        this.props.renameBaseItemHandler(id,price,qty);
    };

    //when press cancel in edit mode, this returns old state values;
    editCancelHadler = () => {
        const { qty, price } = this.state.oldState;
        this.setState({ edit: false, qty: qty, price: price });
    };


    qtyOnChangeHandler = e => {
        this.setState({ qty: e.target.value });
    };

    priceOnChangeHandler = e => {
        this.setState({ price: e.target.value });
    };

    render() {
        let qtyView, priceView, removeButton, editButton;
        const { id, category, name, price, qty } = this.state;
        if (!this.state.edit) {
            qtyView = qty;
            priceView = price;
            removeButton = (
                <button
                    className="edit-icon"
                    data-id={id}
                    onClick={this.deleteItemHandler}
                >
                    <i className="fas fa-minus-circle" />
                </button>
            );
            editButton = (
                <button className="edit-icon" onClick={this.editHandler}>
                    <i className="fas fa-edit"></i>
                </button>
            );
        } else {
            qtyView = (
                <input
                    data-propname={qty}
                    type="text"
                    value={qty}
                    onChange={this.qtyOnChangeHandler}
                />
            );
            priceView = (
                <input
                    data-propname={price}
                    type="text"
                    value={price}
                    onChange={this.priceOnChangeHandler}
                />
            );
            removeButton = (
                <button
                    className="edit-icon"
                    data-category={category}
                    data-id={id}
                    onClick={this.editCancelHadler}
                >
                    <i className="fas fa-window-close" />
                </button>
            );
            editButton = (
                <button className="edit-icon" onClick={this.editOkHandler}>
                    <i className="fas fa-check-circle"></i>
                </button>
            );
        }
        return (
            <tr key={"veiwList-" + id}>
                <th scope="row">{id}</th>
                <td>{category}</td>
                <td>{name}</td>
                <td>{priceView}</td>
                <td>{qtyView}</td>
                <td>
                    {editButton}
                    {removeButton}
                </td>
            </tr>
        );
    }
}

export default BaseMainTable;