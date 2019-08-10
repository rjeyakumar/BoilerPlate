const analytics = () => (next) => (action) => {
  if (action.type && action.type.indexOf('GTM') === 0) {
    const { EventCategory, EventActions, EventLabel } = action;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'RewardsEvents',
      EventCategory,
      EventActions,
      EventLabel,
    });
  }
  return next(action);
};

export default analytics;
