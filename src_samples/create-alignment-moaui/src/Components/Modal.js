import Dialog from "@mui/material/Dialog";
import AlignHelpImage from '../svg/AlignHelp.svg'
import SegmHelpImage from '../svg/SegmHelp.svg'

export {AlignHelp, SegmHelp}

function AlignHelp(openModal, closeModal) {
  return (
    <Dialog
      open={openModal}
      onClose={closeModal}
      aria-labelledby="Align-help-dialog"
      aria-describedby="Align-help-dialog-description"
    >
		<img width={756*0.75} height={213*0.75} src={AlignHelpImage} alt="Align Help" />
    </Dialog>
  )
}

function SegmHelp(openModal, closeModal) {
  return (
    <Dialog
      open={openModal}
      onClose={closeModal}
      aria-labelledby="Segment-help-dialog"
      aria-describedby="Segment-help-dialog-description"
    >
        <img width={655*0.8} height={213*0.8} src={SegmHelpImage} alt="Segment Help" />
    </Dialog>
  )
}