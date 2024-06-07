class SearchModel {
    constructor(imageURL, username) {
      this.imageURL = imageURL;
      this.username = username;
    }
  
    // Custom method to check equality with another SearchModel instance
    equals(other) {
      return (
        this.imageURL === other.imageURL &&
        this.username === other.username
      );
    }
  
    // Custom method to calculate a unique hash code for the object
    hashCode() {
      return this.imageURL.hashCode() ^ this.username.hashCode();
    }
  }
  
  // Custom function to add unique elements to a set
  function addToSetUnique(set, element) {
    let isUnique = true;
    set.forEach(existingElement => {
      if (element.equals(existingElement)) {
        isUnique = false;
        return;
      }
    });
    if (isUnique) {
      set.add(element);
    }
  }

  export { SearchModel, addToSetUnique };