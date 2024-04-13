import mixpanel from 'mixpanel-browser'

//const mixpanel = new mix(settings.mixpanelToken, trackAutomaticEvents);
mixpanel.init('1dae983cd2081598b95fc7b54d00537c', {track_pageview:true, debug:true});

export default mixpanel;