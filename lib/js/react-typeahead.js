var React = require('react'),
    TwitterTypeahead = require('typeahead.js'),
    extend = require("extend"),
    ReactTypeahead;

ReactTypeahead = React.createClass({displayName: "ReactTypeahead",
	/**
	* 'initOptions' method
     * This method sets up the typeahead with initial config parameters. The first set is default
     * and the other set is defined by the 
     */
    initOptions: function () {
    	var defaultMinLength = 2, defaultDivId = 'autosuggest', config = {};

    	if(!this.props.bloodhound)
    		this.props.bloodhound = {};
    	if(!this.props.typeahead)
    		this.props.typeahead = {};
    	if(!this.props.datasource)
    		this.props.datasource = {};
    	
    	if (!this.props.bloodhound.remote.url)
            throw new Error('Oops:( The url is missing from the bloodhound config');

        var defaults = {
        	     bloodhound: {
        	     	     datumTokenizer: Bloodhound.tokenizers.whitespace,
                         queryTokenizer: Bloodhound.tokenizers.whitespace
                 },
        	     typeahead: {
        	     	minLength: defaultMinLength,
  			        hint: true,
                    highlight: true
        	     },
        	     datasource: {
        	     	displayProperty: 'value',
        	        queryStr: '%QUERY'
        	     }
        };

        config.bloodhound = extend(true, {}, defaults.bloodhound, this.props.bloodhound);
        config.typeahead = extend(true, {}, defaults.typeahead, this.props.typeahead);
        config.datasource = extend(true, {}, defaults.datasource, this.props.datasource);
        config.componentId = (this.props.typeahead.id)?this.props.typeahead.id:defaultDivId

        return config;
    },
	/**
     * 'componentDidMount' method
     * Initializes react with the typeahead component.
     */
    componentDidMount: function () {
        var self = this,
            options = this.initOptions();

        var remoteCall = new Bloodhound(options.bloodhound);
        options.datasource.source = remoteCall;
        var typeaheadInput = React.findDOMNode(self);
        if(typeaheadInput)
        	typeaheadInput.typeahead(options.typeahead, options.datasource);
        
    }