import { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const DropMenu = (props) => {
  const { items } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    setDropdownOpen((pS) => !pS);
  };

  // TODO: Pass on item ID, don't use INDEX
  const renderMenu = (items) => {
    return (
      <DropdownMenu>
        {items.map((item) => (
          <DropdownItem key={item.key} {...item.handlers}>
            {item.text}
          </DropdownItem>
        ))}
      </DropdownMenu>
    );
  };

  return (
    <ButtonDropdown className="port-dropdown" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret size="sm"></DropdownToggle>
      {renderMenu(items)}
    </ButtonDropdown>
  );
};

export default DropMenu;
