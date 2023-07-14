# Bootstrap Modal Download

## Summary
This uses a bootstrap modal to show an UI when it's doing a larger download

## How to use
If the url has the file name

```html
<button onclick="javascript:modalDownload('/download.csv')">
    Download
</button>
```

If the URL doesn't have the file name, you have to specify the download name

```html
<button onclick="javascript:modalDownload('/file/123', 'download.csv)">
    Download
</button>
```