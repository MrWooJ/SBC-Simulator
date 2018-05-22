var uuidv1 = require('uuid/v1')

module.exports = {
	/**
	 * @func			{base64Encoding}
	 * @param  		{*} 		        data 	{Input data to encode}
	 * @returns		{!string}		    {Encodes data with Base64 encription algorithm}
	 */
  base64Encoding: function (data) {
    return new Buffer(data).toString('base64')
  },

	/**
	 * @func			{base64Decoding}
	 * @param  		{!string} 		  data 	{Input data to decode}
	 * @returns		{*}		          {Decodes data with Base64 decription algorithm}
	 */
  base64Decoding: function (data) {
    return new Buffer(data, 'base64')
  },
  
	/**
	 * @func			{getUnixTimeStamp}
	 * @returns		{!number}		     {Returns current unix timestamp in milliseconds}
	 */
  getUnixTimeStamp: function () {
    return Math.floor((new Date).getTime())
  },

	/**
	 * @func			{stringReplace}
	 * @param  		{!string} 		  source 	  {Source string to do replacement on}
   * @param  		{!string} 		  find 	    {String which should be replaced}
   * @param  		{!string} 		  replace 	{New string to become replaced on}
	 * @returns		{!string}		    {Returns replacement of a string with another}
	 */
  stringReplace: function (source, find, replace) {
    return source.replace(find, replace)
  },

	/**
	 * @func			{generateUniqueId}
	 * @returns		{!string}		    {Returns a unique identifier based on proccessor timestamp}
	 */
	generateUniqueId: function() {
		return uuidv1()
	},

	/**
	 * @func			{generateRandomString}
   * @param  		{!string} 		  length    {Length of output string}
	 * @returns		{!string}		    {Returns a random string with provided length}
	 */
	generateRandomString: function(length) {
    if (!this.checkIfVariableIsNumber(length))
      return (new Error('Length is not number.'))
		var text = ''
		var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		for (var i = 0; i < Number(length); i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length))
		return text
	},

	/**
	 * @func			{generateRandomNumber}
   * @param  		{!number} 		  min       {Minimum number to be GTE in output number}
   * @param  		{!number} 		  max       {Maximum number to be LTE in output number}
	 * @returns		{!number}		    {Returns a random number between provided min and max numbers}
	 */
	generateRandomNumber: function(min, max) {
    if (!this.checkIfVariableIsNumber(min))
      return (new Error('Min is not number.'))
    if (!this.checkIfVariableIsNumber(max))
      return (new Error('Max is not number.'))
		return Math.floor(Math.random() * (Number(max) - Number(min) + 1) ) + Number(min)
  },
  
	/**
	 * @func			{checkIfVariableIsError}
   * @param  		{*} 		        variable  {Variable to become checked}
	 * @returns		{!boolean}		  {Checks if variable is instance of Error}
	 */
  checkIfVariableIsError: function(variable) {
    return (variable instanceof Error)
  },

	/**
	 * @func			{checkIfVariableIsBoolean}
   * @param  		{*} 		        variable  {Variable to become checked}
	 * @returns		{!boolean}		  {Checks if variable is instance of Boolean}
	 */
  checkIfVariableIsBoolean: function(variable) {
    return (typeof(variable) === 'boolean')
  },

	/**
	 * @func			{checkIfVariableIsNumber}
   * @param  		{*} 		        variable  {Variable to become checked}
	 * @returns		{!boolean}		  {Checks if variable is instance of Number}
	 */
  checkIfVariableIsNumber: function(variable) {
    return (!isNaN(variable))
  }
}
