import decode from 'audio-decode';
import path from 'path';

export const audioDirectory = path.join(process.cwd(), 'public');

// export async function decodeAudio(filepath: string) {
//   try {
//     const response = await fetch(
//       'http://localhost:3000/music/audio/cinematic-designed-sci-fi-whoosh-transition-nexawave-228295.mp3'
//     );
//     if (!response.ok) {
//       throw new Error(`Failed to fetch audio file: ${response.statusText}`);
//     }

//     const audioData = await response.arrayBuffer();

//     const decodedAudio = await decode(audioData); 
//     return decodedAudio;
//   } catch (error) {
//     throw new Error(`Cannot decode the audio file at ${filepath},${error}`);
//   }
// }

export async function audioDecode(audioData: ArrayBuffer) {
  try {
    const decodedAudio = await decode(audioData); // Replace with your actual decoding logic
    return decodedAudio;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Audio decoding failed: ' + error.message);
    } else {
      throw new Error('Audio decoding failed due to an unknown error');
    }
  }
}

export async function processAudioPeaks(
  channelData: Float32Array[],
  bufferSize: number
): Promise<number[]> {
  const peaks: number[] = [];

  for (const data of channelData) {
    const sampleCount = Math.floor(data.length / bufferSize);
    for (let i = 0; i < sampleCount; i++) {
      const chunk = data.slice(i * bufferSize, (i + 1) * bufferSize);
      const peak = Math.max(...chunk);
      peaks.push(peak);
    }
  }

  const min = Math.min(...peaks);
  const max = Math.max(...peaks);
  return peaks.map((peak) => (peak - min) / (max - min));
}

export async function getAudioPeaks(
  filepath: string,
  bufferSize: number
): Promise<number[]> {
  try {
    const response = await fetch(
      `${filepath}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch audio file: ${response.statusText}`);
    }
    const audioData = await response.arrayBuffer();

    const decodedAudio = await decode(audioData);

    const channelData: Float32Array[] = [];
    for (let i = 0; i < decodedAudio.numberOfChannels; i++) {
      await channelData.push(decodedAudio.getChannelData(i)); // Get data for each channel
    }

    return await processAudioPeaks(channelData, bufferSize); // Generate and return the peaks
  } catch (error) {
    throw new Error(`Cannot decode the audio file at ${filepath},${error}`);
  }
}

export async function getMusicWithPeaks(audioFileUrl: string) {
  if (
    !audioFileUrl ||
    (!audioFileUrl.endsWith('.mp3') && !audioFileUrl.endsWith('.wav'))
  ) {
    return [];
  }
 
  try {
    const peaks = await getAudioPeaks(audioFileUrl, 512);
    return peaks;
  } catch (error) {
    throw new Error(`${error}`);

  }
}
