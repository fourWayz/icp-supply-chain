import React, { useEffect, useCallback, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Wallet from "./components/Wallet";
import coverImg from "./assets/img/sandwich.jpg";
import { login, logout as destroy } from "./utils/auth";
import { balance as principalBalance } from "./utils/ledger"
import Cover from "./components/utils/Cover";
import { Notification } from "./components/utils/Notifications";
import AllProducts from "./components/marketplace/Products";
import AddProduct from "./components/marketplace/AddProduct";
import AddShipment from "./components/marketplace/AddShipment";
import AllShipments from "./components/marketplace/Shipments";

const App = function AppWrapper() {
    const isAuthenticated = window.auth.isAuthenticated;
    const principal = window.auth.principalText;

    const [balance, setBalance] = useState("0");

    const getBalance = useCallback(async () => {
        if (isAuthenticated) {
            setBalance(await principalBalance());
        }
    });

    useEffect(() => {
        getBalance();
    }, [getBalance]);

    return (
        <>
            <Notification />
            {isAuthenticated ? (
                <Container fluid="md">
                    <Nav className="justify-content-end pt-3 pb-5">
                        <Nav.Item>
                            <Wallet
                                principal={principal}
                                balance={balance}
                                symbol={"ICP"}
                                isAuthenticated={isAuthenticated}
                                destroy={destroy}
                            />
                        </Nav.Item>
                    </Nav>
                    <main>
                        <div className="row justify-content-center align-items-center">
                            <div className="col-md-6">
                                <AddProduct />
                            </div>
                            <div className="col-md-6">
                                <AddShipment />
                            </div>
                        </div>
                        <AllProducts />
                        <AllShipments />
                    </main>
                </Container>
            ) : (
                <Cover name="Street Foods" login={login} coverImg={coverImg} />
            )}
        </>
    );
};

export default App;