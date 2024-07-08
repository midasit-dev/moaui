import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import ReactMarkdown from 'react-markdown';
import 'katex/dist/katex.min.css'
import { MDResult } from '../variables';
import { useRecoilState } from 'recoil';
import { GuideBox } from '@midasit-dev/moaui';


export default function MDReport() {

  const [mDResult, setMDResult] = useRecoilState(MDResult);
  return(
    <GuideBox>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
      {mDResult}
      </ReactMarkdown>
    </GuideBox>
  )

}