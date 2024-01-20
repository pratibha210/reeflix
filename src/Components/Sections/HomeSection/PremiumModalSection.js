// HomeBannerSkeleton
import React, { useState, useEffect } from 'react';
import '../sections.css';
import Dialog from '@material-ui/core/Dialog';
import ButtonComponent from '../../../Common/UIComponents/ButtonComponent'
import premiumimage from '../../../Images/star.png'
import cross from '../../../Images/close.png'
import * as constant from "../../../constant";
import { __DEV } from "../../../isDev";
import { useSelector, useDispatch } from "react-redux"



const PremiumModalSection = (props) => {
  const [open, setOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(false);
  const [sandbox, setsandbox] = React.useState(false);


  const user = useSelector(state => state.userDetails);

  const [userData, setUserData] = useState({});

  const dispatch = useDispatch()


  useEffect(() => {
    if (user && user._id) {
      setUserData(user)
    }
  }, [user])


  const handleClickOpen = () => {
    setOpen(true);
  };
  const onhandleClose = () => {
    setOpen(false);
  };

  const createOrder = () => {

    let userId = JSON.parse(localStorage.getItem("userDetails"));
    __DEV && console.log(userData, 'L24>>>')

    /// call get all categories api //////
    const reqValues = {
      method: "POST",

      headers: {
        "key": constant.reeflix_App_key,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({

        'userId': userData._id,
        'contentId': props.contentId,
        'amount': props.amount,
        'discount': 0

      })
    };
    __DEV && console.log(reqValues, process.env.REACT_APP_apiurl);

    setProgress(true)

    fetch(process.env.REACT_APP_apiurl + "/order/addOrder", reqValues)
      .then(result => result.json())
      .then(result => {

        __DEV && console.log(result);
        setProgress(false);


        if (!result.error) {

          __DEV && console.log(result.result);

          let orderId = result.result._id;

          createHash(orderId);

        }

        else {

          __DEV && console.log(result.message);
          // this.setState({ message: result.message })

        }

      })
      .catch(err => {
        __DEV && console.log(err);
        setProgress(false);
        // this.setState({ message: err.message })

      });


  }

  //TO create hash in payumoney
  const createHash = (orderId) => {


    let userId = JSON.parse(localStorage.getItem("userDetails"));
    let amount = props.amount
    let discount = 0


    // Data to be Sent to API to generate hash.
    /// call get all categories api //////
    const reqValues = {
      method: "POST",

      headers: {
        "key": constant.reeflix_App_key,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({

        "userId": userData._id,
        "orderId": orderId,
        "amount": amount.toString(),
        "productinfo": props.title,
        "firstname": userData.name.split(' ')[0],
        "email": userData.email,
        "discount": discount.toString(),
        "contentId": props.contentId,
        // "phone": userId.phoneNumber,


      })
    };
    __DEV && console.log(reqValues, process.env.REACT_APP_apiurl);

    setProgress(true);

    fetch(process.env.REACT_APP_apiurl + "/payment/payumoney", reqValues)
      .then(result => result.json())
      .then(result => {

        __DEV && console.log(result);

        // this.setState({onProgress:false});
        setProgress(false);

        if (!result.error) {

          __DEV && console.log(result, 'L132');

          var pd = {
            key: constant.Merchant_key,
            txnid: result.payment.result.transactionId,
            amount: amount.toString(),
            firstname: userData.name.split(' ')[0],
            email: userData.email,
            phone: userData.phoneNumber,
            productinfo: props.title,
            surl: constant.surl,
            furl: constant.furl,
            hash: result.hash,
            id: orderId,
            paymentId: result.payment.result._id,
            sandbox: true
          }

          console.log(pd);

          redirectToPayU(pd);
        }

        else {
          __DEV && console.log(result.message);
          // this.setState({ message: result.message });
          // this.setState({onProgress:false});
        }

      })
      .catch(err => {
        __DEV && console.log(err);
        setProgress(false);
        // this.setState({onProgress:false});
        // this.setState({ message: err.message })

      });

  }

  const redirectToPayU = (pd) => {
    props.handleClose()
    __DEV && console.log(pd);
    let userDetails = JSON.parse(localStorage.getItem("userDetails"));


    window.bolt.launch(pd

      , {
        responseHandler: function (response) {
          __DEV && console.log(response.response);
          if (response.response.txnStatus === "CANCEL") {
            console.log("cancel");

          }
          else {
            var body = {
              productinfo: props.title.toString(),
              firstname: userData.name.split(' ')[0].toString(),
              email: userData.email.toString(),
              txnid: pd.txnid.toString(),
              paymentId: pd.paymentId.toString(),
              orderId: pd.id.toString(),
              contentId: props.contentId.toString(),
              userId: userData._id.toString(),
              amount: pd.amount.toString(),
              discount: '0',
              status: response.response.status,
              hash: pd.hash
            }
            __DEV && console.log(body);
            fetch(process.env.REACT_APP_apiurl + '/payment/payumoney/response', {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "key": constant.reeflix_App_key,
              },
              body: JSON.stringify(body)
            })

              .then(result => result.json())
              .then(result => {
                __DEV && console.log(result);
                if (!result.error) {
                  //   localStorage.setItem('userDetails', JSON.stringify(result.user));
                  // localStorage.setItem('userDetails', JSON.stringify(result.user));
                  dispatch({ type: 'LOGGED_USER_DETAILS', data: result.user });

                }
                else {
                  console.log("err")
                }
              });
          }

        }, catchException: function (error) {

          __DEV && console.log(error);


        }

      })

  }


  return (
    <Dialog onClose={onhandleClose} aria-labelledby="customized-dialog-title" open={props.open} className={"premiumdialog"}>

      <div className="premiummodalsectionstart" onClick={handleClickOpen}>
        <div className="premiummodalcontent">
          <div className="premiumicondiv">
            <img src={premiumimage} />
          </div>
          <div className="closemodaldiv" onClick={props.handleClose}>
            <img src={cross} />
          </div>
          <h2> Premium Video </h2>
          <p>Enjoy the <b>{props.title}</b> right now with no interruption</p>

          <div className="costpricedivmain">
            <p >Total Cost</p>
            <p className="costprice">₹{props.amount}</p>
          </div>
          <div className="paymentbtndiv">
            <ButtonComponent buttontext="Payment" buttonextraclass="paymentbtnforprime"
              handleClick={() => createOrder()} loading={progress}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );

}

export default PremiumModalSection;
