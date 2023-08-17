import Header from "@/structure/Header";
import ToggleButtons from '@/structure/ToggleButtons';
import Body from '@/structure/Body';

export default function Docs() {
  return (
    <div>
			<div>
				<Header />
			</div>
			<div className='mt-4'>
				<ToggleButtons />
			</div>
			<div className='mt-4'>
				<Body />
			</div>
    </div>
  );
}
