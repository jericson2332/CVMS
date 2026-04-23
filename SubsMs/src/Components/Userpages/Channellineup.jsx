import React from 'react'

const channels = [
  { name: "HBO", type: "Movies", number: "#3", img: "https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Logo.svg" },
  { name: "CNN", type: "News", img: "https://upload.wikimedia.org/wikipedia/commons/b/b1/CNN.svg" },
  { name: "ESPN", type: "Sports", img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/ESPN_wordmark.svg" },
  { name: "MTV", type: "Music", img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/MTV_Logo_2010.svg" },
  { name: "Nat Geo", type: "Documentary", img: "https://upload.wikimedia.org/wikipedia/commons/7/7b/National_Geographic_Logo.svg" },
  { name: "Discovery", type: "Science", img: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Discovery_Channel_logo.svg" },
  { name: "Cartoon Network", type: "Kids", img: "https://upload.wikimedia.org/wikipedia/commons/2/26/Cartoon_Network_2010_logo.svg" },
  { name: "AXN", type: "Action", img: "https://upload.wikimedia.org/wikipedia/commons/7/72/AXN_logo_2015.svg" },
  { name: "FOX", type: "Entertainment", img: "https://upload.wikimedia.org/wikipedia/commons/1/16/Fox_Broadcasting_Company_logo.svg" },
  { name: "BBC", type: "News", img: "https://upload.wikimedia.org/wikipedia/commons/5/5f/BBC_News_2022_%28Alt%29.svg" },
  //  Add more entries to reach 80
];

const Channellineup = () => {
  return (
    
    <div className=" text-center ">
      <div className="bg-blue-800 pb-1.5" />
      <p className="text-5xl font-bold text-blue-700 py-5 mb-2"> Channel Line-Up</p>
      <p className="text-2xl text-gray-700 mb-8">Enjoy 80+ channels of entertainment, news, sports & more!</p>

      <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-6 max-w-7xl mx-auto mb-5">
        {channels.map((channel, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow hover:shadow-md p-4 transition duration-300"
          >
            <img
              src={channel.img}
              alt={channel.name}
              className="h-16 mx-auto mb-4 object-contain"
            />
            <h3 className="font-semibold text-blue-800">{channel.name}</h3>
            <p className="text-sm text-gray-500">{channel.type}</p>
            <p className="text-sm text-gray-500"><b>{channel.number}</b></p>
          </div>
        ))}
      </div>
    </div>

  )
}

export default Channellineup