const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const mime = require('mime')
const fs = require('fs')
const request = require('request')
const { getAudioDurationInSeconds } = require('get-audio-duration')
const MeditationAudio = require('../../models/Meditationaudio')
const Review = require('../../models/Review');
const MAudioBookmark = require('../../models/MAudioBookmark');
const auth = require('../../middleware/auth')

router.get('/', async (req, res) => {
  res.json(await MeditationAudio.find().sort({ date: 1 }))
})

router.post('/time_filtered', async (req, res) => {
  res.json((await MeditationAudio.find().sort({ date: 1 })).filter(element => element.duration < Number(req.body.time)))
})

const download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    // console.log('content-type:', res.headers['content-type'])
    // console.log('content-length:', res.headers['content-length'])
    request(uri).pipe(fs.createWriteStream(path.join("./files/", filename))).on('close', callback)
  })
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files')
    },
    filename(req, file, cb) {
      // cb(null, `${new Date().getTime()}_${file.originalname}`)
      cb(null, file.originalname)
    }
  }),
  limits: {
    fileSize: 100000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|JPG|PNG|png|mp3|MP3|AAC|aac|wav|WAV)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      )
    }
    cb(undefined, true) // continue with upload
  }
})

router.post('/add', upload.fields([{ name: 'audiofile', maxCount: 1 }, { name: 'thumbimage', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
  let audiofile = req.files["audiofile"][0].filename
  let duration = await getAudioDurationInSeconds('./files/' + audiofile)
  duration = Math.floor(duration)
  let thumbImageFileName = req.files["thumbimage"] ? req.files["thumbimage"][0].filename : undefined
  let imageFileName = req.files["image"] ? req.files["image"][0].filename : undefined
  let newMeditationAudio = new MeditationAudio({
    name: req.body.name,
    author: req.body.author,
    purpose: req.body.purpose,
    description: req.body.description,
    duration: duration,
    avgrating: req.body.avgrating,
    tags: req.body.tags,
    featured: req.body.featured,
    type: req.body.type,
    price: 0,
    status: req.body.status,
    emotion_pack: req.body.emotion_pack,
    audiofile: audiofile,
  })
  if (req.body.type === "Paid") newMeditationAudio.price = req.body.price
  let tempTags = req.body.tags.split(",")
  newMeditationAudio.tags = tempTags
  if (thumbImageFileName) newMeditationAudio.thumbimage = thumbImageFileName
  if (imageFileName) newMeditationAudio.image = imageFileName
  await newMeditationAudio.save()
  res.json(await MeditationAudio.find().sort({ date: 1 }))
})

router.post('/update', upload.fields([{ name: 'audiofile', maxCount: 1 }, { name: 'thumbimage', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
  let filter = { _id: req.body._id }
  let audiofile = req.files["audiofile"] ? req.files["audiofile"][0].filename : undefined
  let thumbImageFileName = req.files["thumbimage"] ? req.files["thumbimage"][0].filename : undefined
  let imageFileName = req.files["image"] ? req.files["image"][0].filename : undefined
  let update = {
    name: req.body.name,
    author: req.body.author,
    purpose: req.body.purpose,
    description: req.body.description,
    avgrating: req.body.avgrating,
    featured: req.body.featured,
    type: req.body.type,
    status: req.body.status,
    emotion_pack: req.body.emotion_pack,
  }
  if (req.body.type === "Paid") update.price = req.body.price
  else update.price = 0
  let tempTags = req.body.tags.split(",")
  update.tags = tempTags
  if (audiofile) {
    update.audiofile = audiofile
    let duration = await getAudioDurationInSeconds('./files/' + audiofile)
    duration = Math.floor(duration)
    update.duration = duration
  }
  if (thumbImageFileName) update.thumbimage = thumbImageFileName
  if (imageFileName) update.image = imageFileName
  await MeditationAudio.findOneAndUpdate(filter, update)
  res.json(await MeditationAudio.find().sort({ date: 1 }))
})

router.delete('/:id', async (req, res) => {
  await MeditationAudio.remove({ _id: req.params.id })
  res.json(await MeditationAudio.find().sort({ date: 1 }))
})

router.post('/csv', async (req, res) => {
  if (req.body.image) download(req.body.imagePath, req.body.image, function () {})
  if (req.body.thumbimage) download(req.body.thumbimagePath, req.body.thumbimage, function () {})
  download(req.body.audioPath, req.body.audiofile, function () {})
  let duration = await getAudioDurationInSeconds('./files/' + req.body.audiofile)
  duration = Math.floor(duration)
  let newMeditationAudio = new MeditationAudio({
    name: req.body.name,
    author: req.body.author,
    purpose: req.body.purpose,
    description: req.body.description,
    duration: duration,
    avgrating: req.body.avgrating,
    tags: req.body.tags,
    featured: req.body.featured,
    type: req.body.type,
    price: 0,
    status: req.body.status,
    emotion_pack: req.body.emotion_pack,
    audiofile: req.body.audiofile,
  })
  if (req.body.type === "Paid") newMeditationAudio.price = Number(req.body.price)
  let tempTags = req.body.tags.split(",")
  newMeditationAudio.tags = tempTags
  if (req.body.thumbimage) newMeditationAudio.thumbimage = req.body.thumbimage
  if (req.body.image) newMeditationAudio.image = req.body.image
  await newMeditationAudio.save()
  res.json("ok")
})

router.get('/getForClients', (req, res) => {
  MeditationAudio.find({ status: true })
    .then(results => {
      if(results.length > 0) {  
        let resData = [];
        for(let i = 0; i < results.length; i++) {
          let mAudioItem = {};
          mAudioItem._id = results[i]._id;
          mAudioItem.title = results[i].name;
          mAudioItem.thumbimage = results[i].thumbimage;
          mAudioItem.tags = results[i].tags;
          mAudioItem.featured = results[i].featured;
          mAudioItem.author = results[i].author;
          mAudioItem.averageRate = results[i].averageRate,
          mAudioItem.duration = results[i].duration
          resData.push(mAudioItem);
        }
        res.json(resData);
      } else {
        res.json({ message: 'There is no available message.' });
      }
    })
});

router.get('/getOneByIdForClients/:_id', auth, (req, res) => {
  MeditationAudio.findById(req.params._id)
    .then(async result => {
      let mAudioItem = {};
      let isBookmarked = false;
      const reviews = await Review.find({ meditation_audio: req.params._id });
      await MAudioBookmark.findOne({ user: req.user.id, mAudio: req.params._id }) ? isBookmarked = true : isBookmarked = false;
      mAudioItem = {
        _id:              req.params._id,
        backgroundImage:  result.image,
        audiofile:        result.audiofile,
        composer:         result.author,
        audioTitle:       result.name,
        purpose:          result.prupose,
        description:      result.description,
        duration:         result.duration,
        tags:             result.tags,
        ratings:          result.ratings,
        reviews:          reviews,
        isBookmarked:     isBookmarked
      };
      res.json(mAudioItem);
    })
});

//  Get the bookmarked meditation audios by userId
router.get('/getBookmarked/:userId', (req, res) => {
  MAudioBookmark.find({ user: req.params.userId })
    .populate('mAudio')
    .sort({ rank: -1, updatedAt: -1, createdAt: -1 })
    .then(async results => {
      const resData = [];
      for(let i = 0; i < results.length; i += 1) {
        let mAudioItem = {};
        mAudioItem._id = results[i].mAudio._id;
        mAudioItem.audiofile = results[i].mAudio.audiofile;
        mAudioItem.image = results[i].mAudio.image;
        mAudioItem.averageRate = results[i].mAudio.averageRate;
        mAudioItem.author = results[i].mAudio.author;
        mAudioItem.weight = results[i].rank;
        mAudioItem.reviews = await Review.find({ meditation_audio: results[i].mAudio._id, status: true }, { _id: 0, review: 1 });
        resData.push(mAudioItem);
      }
      res.json(resData);
    })
});

module.exports = router
