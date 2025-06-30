# Pet Tee Generator

This is a Pet Tree Generator App for generate photo of an animal wearing t-shirt with printed slogan text

App build using : 
[Next.js](https://nextjs.org) 

## Getting Started

First, run the development server:

```bash
npm i

npm run dev
```


## Prompt Design

This app using replicate ai for generator image using the name of animal and slogan as a parameter.
```bash
"A ${animal}, formal pose for pass photo, wearing a t-shirt with printed text '${text}', the text can be read clearly",
```

### Prompt Structure

``` [Subject], [Pose/Action], [Clothing/Accessories], [Special Requirement] ```

| Component  | Description |
| ------------- | ------------- |
| Subject  | A ${animal}  |
| Pose/Action | formal pose for pass photo|
| Cloth/Acc | wearing a t-shirt with printed text '${text}'  |
| Special Requirement | the text can be read clearly  |


## Deploy on Vercel

This app deploy on vercel app for one click deploy 
<br>
https://pet-tee-generator.vercel.app/
