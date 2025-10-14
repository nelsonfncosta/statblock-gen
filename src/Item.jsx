
import './Item.css';


function ItemBlock({ item, onChange }) {
	// Use the item prop for all values
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (onChange) {
			onChange({ ...item, [name]: value });
		}
	};

	return (
		<div className="item-container">
			<h2>Magic Item Creator</h2>
			<form className="item-form">
				<label>
					Name:
					<input name="name" value={item.name} onChange={handleChange} required />
				</label>
				<label>
					Description:
					<textarea name="description" value={item.description} onChange={handleChange} required />
				</label>
				<label>
					Bonus:
					<input name="bonus" value={item.bonus} onChange={handleChange} placeholder="Optional" />
				</label>
				<label>
					Benefit:
					<input name="benefit" value={item.benefit} onChange={handleChange} placeholder="Optional" />
				</label>
				<label>
					Curse:
					<input name="curse" value={item.curse} onChange={handleChange} placeholder="Optional" />
				</label>
				<label>
					Personality:
					<input name="personality" value={item.personality} onChange={handleChange} placeholder="Optional" />
				</label>
			</form>
				<div className="item-card">
							<div className="item-card-header">
								<span className="item-card-name">{item.name || 'Magic Item Name'}</span>
							</div>
					<div className="item-card-body">
						<div className="item-card-description">{item.description || 'Item description goes here.'}</div>
						{item.bonus && (
							<div className="item-card-section">
								<span className="item-card-section-title">Bonus.</span> {item.bonus}
							</div>
						)}
						{item.benefit && (
							<div className="item-card-section">
								<span className="item-card-section-title">Benefit.</span> {item.benefit}
							</div>
						)}
									{item.curse && (
										<div className="item-card-section">
											<span className="item-card-section-title">Curse.</span> {item.curse}
										</div>
									)}
									{item.personality && (
										<div className="item-card-section">
											<span className="item-card-section-title">Personality.</span> {item.personality}
										</div>
									)}
					</div>
				</div>
		</div>
	);
}

export default ItemBlock;
