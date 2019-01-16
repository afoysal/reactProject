import React, { Component } from 'react';

class EditableRow extends Component {
	render() { 
        return (<tr key={this.props.index}>
                    <td className="ui header data_type">
                        { this.props.item === 'name'? 'Name': null }
                        { this.props.item === 'email'? 'Email': null }
                        { this.props.item === 'address'? 'Address': null }
                        { this.props.item === 'telephone_no'? 'Telephone No': null }
                        { this.props.item === 'image'? 'Photo': null }
                    </td>
                    <td>
                        { this.props.address_element[this.props.item]? 
                        <form className="ui form" onSubmit={this.props.update(this.props.item)}>
                            <input type="text" defaultValue={this.props.element} onChange={this.props.get_value}/>
                            <input type="submit" value="Update" className="ui positive icon button"/>
                        </form> : 
                        this.props.item !== 'image' ? 
                        <span> { this.props.element } 
                            <span className="edit" onClick={()=> { this.props.makeInputBox(this.props.item)} }>Edit</span>
                        </span> : 
                        <span>
                            {this.props.image_element(this.props.element)}
                        </span> } 
                    </td>
                </tr>
        );
	}
}
export default EditableRow;