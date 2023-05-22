import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Popup from '@/components/popup';
import PopupSuccess from '@/components/popupsuccess';
import PopupInfo from '@/components/popupinfo';

const coinurl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'
const coinparameters = {
  'symbol':'ETH',
  'convert':'USD'
}
const coinheaders = {
  'Accepts': 'application/json',
  'X-CMC_PRO_API_KEY': '6f049ede-e2fe-4365-b582-673618dc9475',
}

//const axios = require('axios');

//const CoinMarketCap = require('coinmarketcap-api')
 
const apiKey = 'WE99NHIIQC8Z8KDMEGJJ3SPACQ1F8VKD7E'
var api = require('etherscan-api').init(apiKey);
//Mumbai
//const NFTcontract="0x009bB4938f9C8a3290e5FC166D6eF8d1616Ad5e8";
//Goerli
const NFTcontract="0x006c4237E2233fc5b3793aD9E200076C9Cf99a0E";
const zillowurl='https://api.bridgedataoutput.com/api/v2/pub/transactions?access_token=d555ec24e3f182c86561b09d0a85c3dc&limit=1&sortBy=recordingDate&order=desc&fields=recordingDate,parcels.apn,parcels.full&documentType=grant&recordingDate.gt=2015-01-01&parcels.apn=';
const zillowurladdress='https://api.bridgedataoutput.com/api/v2/pub/transactions?access_token=d555ec24e3f182c86561b09d0a85c3dc&limit=1&sortBy=recordingDate&order=desc&fields=recordingDate,parcels.apn,parcels.full&parcels.apn=';
const myabi=[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_parcelid",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_realtor",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_sellbydays",
				"type": "uint256"
			}
		],
		"name": "createBonus",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_parcelid",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_realtor",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_startdate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_sellbydays",
				"type": "uint256"
			}
		],
		"name": "createBonusTest",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "parcelid",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "lastrecordedDate",
				"type": "uint256"
			}
		],
		"name": "realtorwithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "parcelid",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "lastrecordedDate",
				"type": "uint256"
			}
		],
		"name": "sellerwithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_parcelid",
				"type": "string"
			}
		],
		"name": "getBonusActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_parcelid",
				"type": "string"
			}
		],
		"name": "getBonusamount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_parcelid",
				"type": "string"
			}
		],
		"name": "getBonusrealtor",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_parcelid",
				"type": "string"
			}
		],
		"name": "getBonussellbydate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_parcelid",
				"type": "string"
			}
		],
		"name": "getBonusseller",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_parcelid",
				"type": "string"
			}
		],
		"name": "getBonusstartdate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastapn",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastrequestid",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastselldate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "parcelbonus",
		"outputs": [
			{
				"internalType": "string",
				"name": "parcelid",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "realtor",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "startdate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "sellbydate",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "active",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "parcellastselldate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "url",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "urlresult",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const {ethers} = require('ethers');
const axios = require('axios');
var provider;
var MyContract;
var MyContractwSigner;


//test
const formatLongString = (str) => {
	if (str.length > 6) {
	  return str.slice(0, 3) + '...' + str.slice(-3);
	}
	return str;
  };

const MyForm = () => {
    const today = new Date().toISOString().substr(0, 10); // Get today's date in yyyy-mm-dd format
  
	const [buttonText, setButtonText] = useState("Connect Wallet");
	const [verificationfailed, setVerified] = useState(true);
	const [showPopup, setShowPopup] = useState(false);
	const [showPopupSuccess, setShowPopupSuccess] = useState(false);
    const [popupHeader, setPopupHeader] = useState("");
	const [popupHeaderSuccess, setPopupHeaderSuccess] = useState("");
    const [popupText, setPopupText] = useState("");
	const [showBalloon,setShowBalloon] = useState(false);
	const [balloonText,setBalloonText] = useState("");

	const router = useRouter();
	const { SelAPN } = router.query;
	const {Address} = router.query;
  	console.log('APN = '+{SelAPN});

	  const createbonusfunc = async () => {
		var APN = document.getElementById("parcelid").value;
		var Amount = document.getElementById("bonusamount").value;
		var Realtor = document.getElementById("receiverwallet").value;
		var Sellby = new Date(document.getElementById("sellbydate").value);
	
		var Selltimestamp = Math.floor(Sellby.getTime()/1000);
		var Startby = new Date(document.getElementById("startdate").value);
		var Startdatetimestamp = Math.floor(Startby.getTime()/1000);
		
		//console.log('Startdate = '+Startdatetimestamp);
		
		if (typeof window.ethereum !== 'undefined') {
			console.log('Metamask is installed!');
			
		}
		var myprovider = window.ethereum;
		
		const accounts = await window.ethereum.send(
			"eth_requestAccounts"
		  )
		  
		  const address = accounts.result[0];
		  provider = new ethers.providers.Web3Provider(window.ethereum);
		  const signer = provider.getSigner(address);
	
		  MyContract = new ethers.Contract(NFTcontract, myabi, provider);
	
		  MyContractwSigner = await MyContract.connect(signer);
		  //console.log('APN = '+APN);
		  //console.log('Amount = '+Amount);
		await MyContractwSigner.createBonusTest(APN,Realtor,Startdatetimestamp, Selltimestamp,{value: ethers.utils.parseEther(Amount)}).then(receipt => {
		//await MyContractwSigner.createBonus(APN,Realtor, Selltimestamp,{value: ethers.utils.parseEther(Amount)}).then(receipt => {
						console.log(receipt);
						setPopupHeaderSuccess('Contract Initiated. Final contract confirmation will come from Metamask');
						setShowPopupSuccess(true);
						
						
					}).catch(err => {
						console.error(err);
						
					});
	}


	  const login = async () => {
		//console.log('trying login function');
		
		
		try {
		  const accounts = await window.ethereum.send(
			"eth_requestAccounts"
		  )
		  //console.log('accounts', accounts.result[0]);
		  const address = accounts.result[0];
		  provider = new ethers.providers.Web3Provider(window.ethereum);
		  //var blockNumber = await provider.getBlockNumber();
		  //console.log('Block number = '+ blockNumber);
		  MyContract = new ethers.Contract(NFTcontract, myabi, provider);
		  
		  setButtonText(formatLongString(address));
		}
		catch (error) {
			console.log('Please Install Metamask Wallet');
			return;
		}
	}

	/*const checkprice = async () =>{
		console.log('check ETH price')
		//client.getQuotes({symbol: 'USD,ETH'}).then(console.log).catch(console.error)
		//var response = axios.get(coinurl, {coinparameters})
		var response = api.
		var balance = api.account.balance('0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae');
		balance.then(function(balanceData){
  		console.log(balanceData);});
		//console.log(response);

	}*/

	useEffect(()=>{
        login();
        //checkprice();
    })

	const handleClosePopup = () => {
        setShowPopup(false);
      };

	  const handleClosePopupSuccess = () => {
        setShowPopupSuccess(false);
		router.push('/');
      };

	  const handleClickBalloon = () => {
		setBalloonText('The amount entered is in ETH. For a conversion to USD, please visit https://www.coinbase.com/converter/eth/usd Conversion can be up to five decimal points e.g. 0.00001');
		setShowBalloon(true);
	  }

	  const handleClickBalloon2 = () => {
		setBalloonText('This is the start date of the contract.');
		setShowBalloon(true);
	  }

	  const handleClickBalloon3 = () => {
		setBalloonText('This is the end date of the contract. The real property grant deed must be recorded by this date.');
		setShowBalloon(true);
	  }

	  const handleClickBalloon4 = () => {
		setBalloonText('This is the sender wallet address. This wallet address will fund the contract via MetaMask.');
		setShowBalloon(true);
	  }

	  const handleClickBalloon5 = () => {
		setBalloonText('This is the receiver wallet address. If contract terms are met, funds will be sent to the receiver wallet address.');
		setShowBalloon(true);
	  }

	  const handleCloseBalloon = () => {
        setShowBalloon(false);
      };


	const copyToClipboardseller = async () => {
		// Logic to copy value to clipboard
		//const valueToCopy = "Hello, clipboard!";
		//navigator.clipboard.writeText(valueToCopy);
		let clipboardresult = await navigator.clipboard.readText();
		
		const myInput = document.getElementById("senderwallet");
		//console.log(APN);
		myInput.value=clipboardresult;
		
	  };

	  const copyToClipboardreceiver = async () => {
		// Logic to copy value to clipboard
		//const valueToCopy = "Hello, clipboard!";
		//navigator.clipboard.writeText(valueToCopy);
		let clipboardresult = await navigator.clipboard.readText();
		
		const myInput = document.getElementById("receiverwallet");
		//console.log(APN);
		myInput.value=clipboardresult;
		
	  };

	  //verify input data
	  const verifydata = async() => {
		const verAPN= document.getElementById("parcelid").value;
		const verAmount= document.getElementById("bonusamount").value;
		const verStartdate= document.getElementById("startdate").value;
		const verSellbydate= document.getElementById("sellbydate").value;
		const verSeller= document.getElementById("senderwallet").value;
		const verRealtor= document.getElementById("receiverwallet").value;

		if (verAPN=="" || verAmount==0 || verStartdate=="" || verSellbydate=="" ||verSeller=="" || verRealtor=="") {
			console.log('Verification failed');
			setVerified(true);
			setPopupHeader('Input verification failed');
			setPopupText('Please check input data');
			setShowPopup(true);
		}
		else{
			console.log('Verification ok');
			setVerified(false);
		}

	  }

	  //verify input data
	  const handleChange = async() => {
		const verAPN= document.getElementById("parcelid").value;
		const verAmount= document.getElementById("bonusamount").value;
		const verStartdate= document.getElementById("startdate").value;
		const verSellbydate= document.getElementById("sellbydate").value;
		const verSeller= document.getElementById("senderwallet").value;
		const verRealtor= document.getElementById("receiverwallet").value;

		if (verAPN=="" || verAmount==0 || verStartdate=="" || verSellbydate=="" ||verSeller=="" || verRealtor=="") {
			console.log('Verification failed');
			setVerified(true);
			//setPopupHeader('Input verification failed');
			//setPopupText('Please check input data');
			//setShowPopup(true);
		}
		else{
			console.log('Verification ok');
			setVerified(false);
		}

	  }

    return (
      <div className="bg-default-bg min-h-screen">
        <nav className="flex justify-between items-center bg-default-bg p-4">
		<a href="/" className="text-white font-bold text-2xl hover:text-gray-300">
			<img src="/assets/images/logo5.png" alt="Smartcrow logo" className="max-w-xs h-auto " /> 
		</a>
		  <p className="text-default-text font-bold text-sm md:text-lg">New Contract</p>
          <button className="bg-default-bt text-default-bt-text px-4 py-2 rounded border border-default-border" onClick={login}>{buttonText}</button>
        </nav>
        <div className="container mx-auto pb-3">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center flex-row p-2">
              <label for="parcelid" className="font-bold mr-4 w-24 text-default-text">
                APN
              </label>
              <input
                type="text"
                id="parcelid"
                className="border-default-border border rounded py-2 px-3 mt-1 max-w-screen-sm flex-grow"
				defaultValue={SelAPN}
				onChange={handleChange}
              />
            </div>
            <div className="flex items-center flex-row p-2">
			<label for="parcelid" className="font-bold mr-4 w-24 text-default-text">
                
              </label>
              <textarea
                id="addresscheck"
                className="border-gray-300 bg-gray-700 text-white text-center border rounded flex-grow max-w-screen-sm py-2 px-3 mt-1"
				defaultValue={Address}
                rows={2}
              />
            </div>
            <div className="flex items-center flex-row p-2">
              <label for="bonusamount" className="font-bold mr-4 w-24 text-default-text">
                Amount (ETH)
              </label>
              <input
                type="text"
				inputMode='numeric'
                id="bonusamount"
                className="border-default-border border rounded max-w-screen-sm flex-grow py-2 px-3 mt-1"
				onChange={handleChange}
              />
			  <button className="bg-white text-blue-500 font-semibold px-2 py-2 rounded-full mr-2" onClick={handleClickBalloon}>
			  	<img src="/assets/images/info.png" alt="Paste Image" className="h-5 w-5" /> 
			</button>
            </div>
            <div className="flex items-center flex-row p-2">
              <label for="startdate" className="font-bold mr-4 w-24 text-default-text">
                Start Date
              </label>
              <input
                type="date"
                id="startdate"
                className="border-default-border border rounded py-2 px-3 mt-1 max-w-screen-sm flex-grow"
                defaultValue={today}
				onChange={handleChange}
              />
			  <button className="bg-white text-blue-500 font-semibold px-2 py-2 rounded-full mr-2" onClick={handleClickBalloon2}>
			  	<img src="/assets/images/info.png" alt="Paste Image" className="h-5 w-5" /> 
			</button>
            </div>
            <div className="flex items-center flex-row p-2">
              <label for="sellbydate" className="font-bold mr-4 w-24 text-default-text">
                Sell By
              </label>
              <input
                type="date"
                id="sellbydate"
                className="border-default-border border rounded max-w-screen-sm flex-grow py-2 px-3 mt-1"
				onChange={handleChange}
              />
			  <button className="bg-white text-blue-500 font-semibold px-2 py-2 rounded-full mr-2" onClick={handleClickBalloon3}>
			  	<img src="/assets/images/info.png" alt="Paste Image" className="h-5 w-5" /> 
			</button>
            </div>
            <div className="flex items-center flex-row p-2">
              <label for="senderwallet" className="font-bold mr-4 w-24 text-default-text">
                Sender Wallet
              </label>
              <input
                type="text"
                id="senderwallet"
                className="border-default-border border rounded max-w-screen-sm flex-grow py-2 px-3 mt-1"
				onChange={handleChange}
              />
			  
			<button className="bg-white text-blue-500 font-semibold px-2 py-2 rounded-full mr-2" onClick={handleClickBalloon4}>
			  	<img src="/assets/images/info.png" alt="Paste Image" className="h-5 w-5" /> 
			</button>
            </div>
            <div className="flex items-center flex-row p-2">
              <label htmlFor="receiverwallet" className="font-bold mr-4 w-24 text-default-text">
                Receiver Wallet
              </label>
              <input
                type="text"
                id="receiverwallet"
                className="border-default-border border rounded max-w-screen-sm flex-grow py-2 px-3 mt-1"
				onChange={handleChange}
              />
			  
			<button className="bg-white text-blue-500 font-semibold px-2 py-2 rounded-full mr-2" onClick={handleClickBalloon5}>
			  	<img src="/assets/images/info.png" alt="Paste Image" className="h-5 w-5" /> 
			</button>
            </div>
            <div className="p-6 flex items-center justify-center">
				
                <button className={`py-2 px-4 rounded ${
        verificationfailed ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-default-bt text-default-bt-text hover:bg-gr-200 border border-default-border'
      }`} disabled={verificationfailed} onClick={createbonusfunc}>
		  	        Create Contract
		        </button>
				
            </div>
			<div className="p-6 flex items-center justify-center">
				<p className='text-xs text-red-700'>Once Create Contract button is pressed, all entered data is final and cannot be edited. Make sure all entered data is correct.</p>
			</div>
          </div>
        </div>
		
		{showPopup && (
                <Popup header={popupHeader} text={popupText} closeModal={handleClosePopup} isOpen={showPopup}/>
                )}
		{showPopupSuccess && (
                <PopupSuccess header={popupHeaderSuccess} text={""} closeModal={handleClosePopupSuccess} isOpen={showPopupSuccess}/>
                )}
		{showBalloon && (
                <PopupInfo text={balloonText} closeModal={handleCloseBalloon} isOpen={showBalloon}/>
                )}
      </div>
    );
  };
  
  export default MyForm;