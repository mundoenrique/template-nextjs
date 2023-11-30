import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
//Internal app
import { ActionOption } from '@/interfaces';

const ActionOptions = ({ field, label, icon, action, onAction }: ActionOption) => {
  const handleContinue = () => {
    onAction(action);
  };

  return (
    <Tooltip title={label} placement="top">
      <IconButton aria-label={field} color="primary" onClick={handleContinue}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default ActionOptions;
