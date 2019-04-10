class Delete extends React.Component {

    deleteModel() {
        userRequest(this.formData, "DELETE");
    }

    render() {
        return (
            <button className="btn btn-primary " onClick={this.deleteModel.bind(this)}>Удалить профиль</button>
        )

    }
}