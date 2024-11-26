import { Component } from "react";
import Switch from "react-switch";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

class SwitchExample extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: this.props.checked };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (checked) => {
    this.setState({ checked });
    if (this.props.onChange) {
      this.props.onChange(checked);
    }
  };

  render() {
    const iconStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      fontSize: 14, // Ajuster la taille selon vos besoins
      color: "white", // Couleur de l'icône
    };

    return (
      <label>
        <span>{this.props.name}</span>
        <Switch
          height={20}
          width={40}
          onColor="#007783"
          offColor="#007783"
          onChange={this.handleChange}
          checked={this.state.checked}
          uncheckedIcon={
            <div style={iconStyle}>
              <FaArrowTrendUp />
            </div>
          }
          checkedIcon={
            <div style={iconStyle}>
              <FaArrowTrendDown />
            </div>
          }
        />
      </label>
    );
  }
}

export default SwitchExample;
