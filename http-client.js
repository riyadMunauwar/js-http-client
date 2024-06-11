class HttpClient {
    constructor() {
      this.xhr = new XMLHttpRequest();
    }
  
    get(url) {
      this.xhr.open('GET', url, true);
      return this;
    }
  
    post(url, data) {
      this.xhr.open('POST', url, true);
      this.setRequestHeader('Content-Type', 'application/json');
      this.send(JSON.stringify(data));
      return this;
    }
  
    put(url, data) {
      this.xhr.open('PUT', url, true);
      this.setRequestHeader('Content-Type', 'application/json');
      this.send(JSON.stringify(data));
      return this;
    }
  
    delete(url) {
      this.xhr.open('DELETE', url, true);
      this.send();
      return this;
    }
  
    setRequestHeader(header, value) {
      this.xhr.setRequestHeader(header, value);
      return this;
    }
  
    upload(file, progressCallback) {
      const formData = new FormData();
      formData.append('file', file);
  
      this.xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          progressCallback(progress, event);
        }
      });
  
      this.setRequestHeader('Content-Type', 'multipart/form-data');
      this.send(formData);
      return this;
    }
  
    download(progressCallback) {
      this.xhr.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          progressCallback(progress, event);
        }
      });
  
      return this;
    }
  
    send(data) {
      this.xhr.send(data);
      return this;
    }
  
    abort() {
      this.xhr.abort();
      return this;
    }
  
    on(eventName, callback) {
      this.xhr.addEventListener(eventName, callback);
      return this;
    }
  
    then(callback) {
      this.xhr.addEventListener('load', () => {
        if (this.xhr.status >= 200 && this.xhr.status < 300) {
          callback(null, this.xhr.response);
        } else {
          callback(new Error(`Request failed with status ${this.xhr.status}`));
        }
      });
  
      this.xhr.addEventListener('error', () => {
        callback(new Error('Network error'));
      });
  
      return this;
    }
  
    catch(callback) {
      this.xhr.addEventListener('error', callback);
      return this;
    }
  }