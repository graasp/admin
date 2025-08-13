# Settign the server up

Copy the hardening script to the server:

```sh
scp -i <your-ssh-key> scripts/hardening.sh ubuntu@<your-ip>:~/hardning.sh
```

SSH into the server:

```sh
ssh -i <your-ssh-key> ubuntu@<your-ip>
```
