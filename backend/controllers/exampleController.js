// Simple example controller to demonstrate how to add routes
exports.publicHello = async (req, res) => {
  res.json({ success: true, message: 'Hello from public example endpoint' });
};

exports.protectedHello = async (req, res) => {
  // `verifyToken` middleware attaches `req.user`
  res.json({ success: true, message: `Hello user ${req.user?.userId || 'unknown'} (protected)` });
};

exports.adminHello = async (req, res) => {
  res.json({ success: true, message: 'Hello admin (role-protected)' });
};
