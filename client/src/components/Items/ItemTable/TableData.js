import React from "react";

class TableData extends React.Component {
    state = {
        edit: false,
        id: this.props.data.uniq_Id,
        category: this.props.data.category,
        name: this.props.data.name,
        price: this.props.data.price,
        oldState: {}
    };

    //turns on edit mode;
    editHandler = () => {
        this.setState(prevState => ({
            edit: true,
            oldState: {
                name: prevState.name,
                price: prevState.price,
                category: prevState.category
            }
        }));
    };

    //when your press ok in edit mode;
    editOkHandler = () => {
        const {
            name: oldName,
            price: oldPrice,
            category: oldCategory
        } = this.state.oldState;
        const { category, name, price } = this.state;

        if (category !== oldCategory) {
            this.replaceItemCat();
        } else if (name !== oldName || price !== oldPrice) {
            this.replaceItemValues();
        }
        this.setState({ edit: false });
    };

    //sub function for editOkHandler. Replace item category;
    replaceItemCat = () => {
        const {id,category,name,price} = this.state;
        this.props.editItemCatInBase(id,category,name,price,this.state.oldState.category);
    };

    //sub function for editOkHandler. Replace item name and price;
    replaceItemValues = () => {
        const {id,category,name,price} = this.state;
        this.props.renameItemHandler(id,category,name,price);
    };

    //when press cancel in edit mode, this returns old state values;
    editCancelHadler = () => {
        const { name, price, category } = this.state.oldState;
        this.setState({
            edit: false,
            name: name,
            price: price,
            category: category
        });
    };

    selectHandler = e => {
        this.setState({ category: e.target.value });
    };

    nameOnChangeHandler = e => {
        this.setState({ name: e.target.value });
    };

    priceOnChangeHandler = e => {
        this.setState({ price: e.target.value });
    };

    render() {
        let nameView, priceView, removeButton, editButton, categoryView;
        const { id, category, name, price } = this.state;
        if (!this.state.edit) {
            nameView = name;
            priceView = price;
            categoryView = category;
            removeButton = (
                <button
                    className="edit-icon"
                    data-category={category}
                    data-id={id}
                    onClick={()=>{this.props.deleteItemHandler(this.state.id,this.state.category)}}
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
            nameView = (
                <input
                    data-propname={name}
                    type="text"
                    value={name}
                    onChange={this.nameOnChangeHandler}
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
            categoryView = (
                <select value={category} onChange={this.selectHandler}>
                    {this.props.categories.map(i => (
                        <option key={"categoryViewOption-"+i} value={i}>{i}</option>
                    ))}
                </select>
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
                <td>{categoryView}</td>
                <td>{nameView}</td>
                <td>{priceView}</td>
                <td>
                    {editButton}
                    {removeButton}
                </td>
            </tr>
        );
    }
}



export default TableData;