import {forwardRef, useImperativeHandle, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, SvgIconProps} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';

export type DialogRef = {
  handleClickShow: (show:boolean) => void;
};

type DialogProps = {
  msg: string;
  icon: React.ReactElement<SvgIconProps>
  btnCancel?: boolean
  loading?: boolean
  action?: number
  handleFunction?: () => void
};

const AlertDialog = forwardRef<DialogRef, DialogProps>(({msg, icon, loading, action, btnCancel, handleFunction}, ref) => {

  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    handleClickShow(show) {
      setOpen(show);
    }
  }));

  const handleContinue = () => {

    switch (action) {
      case 1:
        if (handleFunction) {
          handleFunction();
        }
        break;
      default:
        setOpen(false)
        break;
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='xs'
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title" sx={{ alignSelf: 'center' }}>
          <Avatar sx={{ bgcolor: 'custom.fifth' }}>
            {icon}
          </Avatar>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            btnCancel && (
              <Button onClick={() => setOpen(false)} autoFocus>
                Cancel
              </Button>
            )
          }
          <Button variant="contained" onClick={handleContinue} autoFocus disabled={loading}>
            {loading && <CircularProgress color='primary' size={20} />}
            {!loading && 'Accept'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default AlertDialog
