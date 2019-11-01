import React, { PureComponent, Fragment } from 'react';

class Create extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			currencies: [],
			contragents: [],
			contragent_id: null,
			category_id: null,
			currency_id: null,
			workspace_id: 1,
			user_id: 1,
			sum: '',
			type: 1,
			comment: '',
		}
	}

	componentDidMount() {

	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	};

	render() {
		const {
			categories,
			currencies,
			contragents,
			workspace_id,
			user_id,
			contragent_id,
			category_id,
			currency_id,
			sum,
			type,
			comment,
		} = this.state;

		return (
			<main>

				<div>
					<label htmlFor="type">Контгарент</label>
					<select name="contragent_id" id="contragent_id" value={contragent_id} onChange={this.handleChange}>

					</select>
				</div>

				<div>
					<label htmlFor="category_id">Категория</label>
					<select name="category_id" id="category_id" value={category_id} onChange={this.handleChange}>

					</select>
				</div>

				<div>
					<label htmlFor="currency_id">Валюта</label>
					<select name="currency_id" id="currency_id" value={currency_id} onChange={this.handleChange}>

					</select>
				</div>

				<div>
					<label htmlFor="type">Тип</label>
					<select name="type" id="type" value={type} onChange={this.handleChange}>
						<option value="1">Расход</option>
						<option value="2">Приход</option>
					</select>
				</div>

				<div>
					<label htmlFor="sum">Сумма</label>
					<input type="text" id={'sum'} name={'sum'} value={sum} onChange={this.handleChange} />
				</div>

				<div>
					<label htmlFor="comment">Комментарий</label>
					<input type="text" id={'comment'} name={'comment'} value={comment} onChange={this.handleChange} />
				</div>

				<button>Создать</button>
			</main>
		)
	}
}

export default Create;
