import { getFileUrl } from '@/_app/utils/getFileUrl';
import { VideoPlayer, VideoPlayerProps } from '@graphland/react-video-player';
import { Paper, Text, Title } from '@mantine/core';

// interface AnswerVideo {
//   path: string;
//   provider: string;
// }

// interface Answer {
//   answerVideo?: AnswerVideo | null;
//   body: string;
//   title: string;
// }

// interface AnswersResponse {
//   answers: Answer[];
// }

const ApplicationVideo = ({ answer }: any) => {
	// console.log(answer);

	const videoSources = [
		{
			src: getFileUrl(answer?.answerVideo!, 'video') || '',
			type: 'video/mp4',
		},
	];

	const videoProps: VideoPlayerProps = {
		theme: 'city', // 'city', 'fantasy', 'forest', 'sea'
		height: 300,
		width: 600,
		autoPlay: false,
		loop: false,
		sources: videoSources,
		controlBar: {
			skipButtons: {
				forward: 5,
				backward: 5,
			},
		},
		playbackRates: [0.5, 1, 1.5, 2],
		disablePictureInPicture: false,
		onReady: () => {
			console.log('Video player is ready!');
		},
	};
	return (
		<div className='p-6'>
			<Title className='text-base'>{answer.title}</Title>
			<Text>{answer.body}</Text>
			<Paper shadow='lg' mt={10} className='flex items-center justify-center'>
				<VideoPlayer {...videoProps} />
			</Paper>
		</div>
	);
};

export default ApplicationVideo;
