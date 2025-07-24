import { Realtime } from 'ably'
import { onUnmounted } from 'vue'

const ably = new Realtime('2FeVXA.l-xcog:LMmVSofRgR-9fjIRoAGRxmcj5IeC5uY0BRKfiE1A0NE')

export function useAblyChannel(channelName) {
  const channel = ably.channels.get(channelName)

  function subscribe(event, callback) {
    channel.subscribe(event, callback);
  }

  function publish(event, data) {
    channel.publish(event, data)
  }

  onUnmounted(() => {
    channel.detach()
  })

  return { subscribe, publish }
}
