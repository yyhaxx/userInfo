const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
let app = express()
app.use(express.static(__dirname + '/data'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.send('index')
})

app.post('/update/:_id', (req, res) => {
	let _id = req.params._id
	let datas
	fs.readFile('./data/info.json', (err, data) => {
	  if (err) throw err
	  datas = JSON.parse(data)
	  for (let i = 0; i < datas.length; i++) {
	  	if (_id == datas[i]['_id']) {
	  		datas[i] = req.body
	  	}
	  }
	  datas = JSON.stringify(datas)
	  let newBuffer = new Buffer(datas)
  	fs.writeFile('./data/info.json', newBuffer, (err, data) => {
  		if(err) throw err
  		res.send('文件写入成功')
  	})	
	})
	
}),

app.post('/insert', (req, res) => {
	fs.readFile('./data/info.json', (err, data) => {
		if (err) throw err
		let datas
		datas = JSON.parse(data)
		let len = datas.length
		let newArr = req.body
		let date = new Date()
		let dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
		newArr['_id'] = datas[len - 1]['_id'] + 1
		newArr['date'] = dateStr
		datas[datas.length] = newArr
		datas = JSON.stringify(datas)
	  let newBuffer = new Buffer(datas)
		fs.writeFile('./data/info.json', newBuffer, (err, data) => {
			if(err) throw err
			res.send(datas)
		})
	})
}),

app.delete('/delete/:_id', (req, res) => {
	let _id = req.params._id
	let datas
	fs.readFile('./data/info.json', (err, data) => {
	  if (err) throw err
	  datas = JSON.parse(data)
	  for (let i = 0; i < datas.length; i++) {
	  	if (_id == datas[i]['_id']) {
	  		datas.splice(i, 1)
	  		break;
	  	}
	  }
	  datas = JSON.stringify(datas)
	  let newBuffer = new Buffer(datas)
  	fs.writeFile('./data/info.json', newBuffer, (err, data) => {
  		if(err) throw err
  		res.send({'msg': 1, 'datas': datas})
  	})	
	})
})
app.listen(3000)