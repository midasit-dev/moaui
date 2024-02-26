import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import * as Buttons from './Buttons.js';
import Stack from '@mui/material/Stack';
import HelpImage from '../svg/help.svg'

export {ElemImportModal, HelpModal}

function ElemImportModal(openModal, closeModal, ElemList, setElemList, clickevent) {
  return (
    <Modal
      open={openModal}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        width: 420,
        height: 100,
        border: '0px solid #000',
        borderRadius: '5px',
        boxShadow: 24,
      }}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="center" sx={{margin:4}}>
        <TextField
          focused 
          required
          value = {ElemList||""}
          size="small"
          id="outlined-required"
          label="Elements"
          onChange={(e)=>setElemList(e.target.value)}
          sx={{padding:0, margin:4}}
          inputProps={{style: {fontSize: "14px"}}}
        />
        {Buttons.ElemButton("contained","apply",clickevent)}
      </Stack>
      </Box>
    </Modal>
  )
}

function HelpModal(openModal, closeModal) {
  return (
    <Modal
      open={openModal}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        width: 712*0.9,
        height: 293*0.9,
        border: '0px solid #000',
        borderRadius: '5px',
        boxShadow: 24,
      }}>
        <img className="imageStyle" src={HelpImage} alt="" />
      </Box>
    </Modal>
  )
}