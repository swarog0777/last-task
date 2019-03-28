class Delete extends React.Component {

    deleteModel() {
        postRequest(this.formData, "/delete", true);
    }

    render() {
        return (
            <button className="btn btn-primary " onClick={this.deleteModel.bind(this)}>Удалить профиль</button>
        )

    }
}