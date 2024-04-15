import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {Button, GuideBox
} from '@midasit-dev/moaui';
const UploadDownload = () => {

return(
  <GuideBox row spacing={1}>
    <Button>다운로드</Button>
    <Button>업로드</Button>
  </GuideBox>

)


}

export default UploadDownload;