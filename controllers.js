const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.cluster,
  useTLS: true,
});

module.exports.test = async (req, res) => {
  res.send("hello friend");
};

module.exports.authenticate = (req, res) => {
  console.log("authentication in progress..");
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const user_id = req.body.user_id;
  const presenceData = {
    user_id: user_id,
    user_info: {
      user_id: user_id,
      name: req.body.username,
    },
  };

  console.log(presenceData);
  const auth = pusher.authenticate(socketId, channel, presenceData);
  console.log(auth);
  res.send(auth);
};

// route: /channels
module.exports.getChannels = async (req, res) => {
  console.log("get_channels");
  const channels = await get_channels();
  res.send(channels);
};

// route: /channels:channel_name
module.exports.getChannel = async (req, res) => {
  const channel_name = req.params.channel_name;
  const channel = await get_channel(channel_name);
  res.send(channel);
};

// route: /send-message
module.exports.send_message = (req, res) => {
  const payload = req.body;
  pusher
    .trigger("presence-main", "get-message", payload)
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
    });
};

// route: /users:channel_name
module.exports.getUsersByChannel = async (req, res) => {
  const channel_name = req.params.channel_name;
  const users = await get_users_by_channel(channel_name);
  res.send(users);
};

const get_channels = async () => {
  try {
    const res = await pusher.get({
      path: "/channels",
    });
    if (res.status === 200) {
      const body = await res.json();
      const channelsInfo = body.channels;
      console.log(body);
      return channelsInfo;
    }
  } catch (error) {
    console.log(error);
  }
};

const get_channel = async (channel_name) => {
  try {
    const res = await pusher.get({
      path: `/channels/${channel_name}`,
      params: {
        info: ["user_count", "subscription_count"]
      },
    });
    if (res.status === 200) {
      const body = await res.json();
      return body;
    }
  } catch (error) {
    console.log(error);
  }
};

const get_users_by_channel = async (channel_name) => {
  try {
    const res = await pusher.get({
      path: `/channels/${channel_name}/users`,
    });

    if (res.status === 200) {
      const body = await res.json();
      const users = body.users;
      console.log(body);
      return users;
    }
  } catch (error) {
    console.log(error);
  }
};